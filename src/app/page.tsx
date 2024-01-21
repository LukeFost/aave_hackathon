"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { signMessage } from "@wagmi/core";
import { useState } from "react";
import { config } from "../wagmi";
import Dashboard from "./dashboard";

import axios from "axios";

function App() {
  const account = useAccount();
  const connector = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const [signing, setSigning] = useState(false);
  const [signature, setSignature] = useState("");
  const [signError, setSignError] = useState("");
  const [validity, setValidity] = useState("");

  const setMessage = "What up!";

  const handleSignMessage = async () => {
    if (!account) return;

    setSigning(true);
    setSignature("");
    setSignError("");

    try {
      const result = await signMessage(config, {
        message: setMessage,
        connector: account.connector,
      });
      setSignature(result);
      // run server action here
      console.log(account.address);
      handleVerifySignature();
    } catch (error) {
      setSignError(error instanceof Error ? error.message : String(error));
    } finally {
      setSigning(false);
    }
  };

  const handleVerifySignature = async () => {
    try {
      const response = await axios.post("/api/verifySignature", {
        signature,
        address: account?.address,
        message: setMessage,
      });
      const { isValid } = response.data;
      setValidity(isValid ? "Signature is valid." : "Signature is invalid.");
    } catch (error) {
      setValidity("Error occurred during verification.");
    }
  };

  // Company Name: Two Guys Engineering
  // max attempts is 3
  // custom ID is the signature that the user provides
  // no need for callback url since I can save to vault
  // no need since website will ask if signature is green or red
  // reusable? no only once per signature
  // expiration time is none

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === "connected" && (
          <div>
            <button type="button" onClick={() => disconnect()}>
              Disconnect
            </button>
            {!signature && (
              <button
                type="button"
                onClick={handleSignMessage}
                disabled={signing}
              >
                {signing ? "Signing..." : "Sign Message"}
              </button>
            )}

            {signature && (
              <>
                <p>
                  Click the link to redirect to a website to verify your ID and
                  personhood.
                </p>
                {validity && <p>Yo real stuff in here</p>}
                {!validity && <p>Yo it aint cool in here</p>}
              </>
            )}
          </div>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>

      {signature && <Dashboard />}
    </>
  );
}

export default App;
