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
  const [docuPassLink, setDocuPassLink] = useState<string | null>(null);

  const setMessage = "hello";

  // Function to load the DocuPass link from local storage
  const loadDocuPassLinkFromLocalStorage = (address: string) => {
    const savedData = localStorage.getItem("docuPassData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.address === address) {
        return parsedData.docuPassLink;
      }
    }
    return null; // No link or address does not match
  };

  // Function to save the DocuPass link to local storage
  const saveDocuPassLinkToLocalStorage = (address: string, link: string) => {
    const dataToSave = JSON.stringify({ address, docuPassLink: link });
    localStorage.setItem("docuPassData", dataToSave);
  };

  const handleSignMessage = async () => {
    if (!account) return;

    setSigning(true);
    setSignature("");
    setSignError("");

    try {
      const result = await signMessage(config, {
        account: account.address,
        message: setMessage,
        connector: account.connector,
      });
      setSignature(result);
      console.log(account.address, setMessage, result);
      handleVerifySignature(account.address, setMessage, result);
    } catch (error) {
      setSignError(error instanceof Error ? error.message : String(error));
    } finally {
      setSigning(false);
    }
  };

  const handleVerifySignature = async (
    address: string,
    message: string,
    signature: string
  ) => {
    // Load any existing DocuPass link from local storage
    const existingLink = loadDocuPassLinkFromLocalStorage(address);

    try {
      // Include the existingLink boolean in the POST data
      const response = await axios.post("/api/verifySignature", {
        signature,
        address: address,
        message: message,
        existingLink: !!existingLink, // Convert to boolean: true if existingLink is not null
      });

      // If a new link is returned, it means there was no link in the vault and a new one was needed
      const { docuPassLink } = response.data;
      if (docuPassLink && !existingLink) {
        saveDocuPassLinkToLocalStorage(address, docuPassLink);
      }

      // Use the existing link or the new one from the API response
      setDocuPassLink(existingLink || docuPassLink);
    } catch (error) {
      console.error("Error occurred during verification:", error);
      setDocuPassLink(null);
    }
  };

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
                  {docuPassLink
                    ? "Click the link to redirect to a website to verify your ID and personhood."
                    : "Processing your verification..."}
                </p>
                {docuPassLink && (
                  <a
                    href={docuPassLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify Identity
                  </a>
                )}
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
