import { creditManager } from "../../abis/creditManager"; // Replace with your actual ABI path
import { client, account, publicClient } from "../../config";
import axios from "axios";
import { hashMessage } from "viem";

const verifyUserOnContract = async (userAddress: string) => {
  try {
    // Call the vault API to check for the user's address
    const vaultResponse = await axios.post(
      "https://api.idanalyzer.com/vault/list",
      {
        apikey: process.env.ENV_DOCU_API_KEY,
        filter: `docupass_customid = ${userAddress}`,
      }
    );

    const data = await publicClient.readContract({
      address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
      abi: creditManager,
      functionName: "verifiedUser",
      args: [userAddress],
    });
    if (data) {
      throw new Error("User already verified");
    } else {
      if (vaultResponse.data.total > 0) {
        const entry = vaultResponse.data.items.find(
          (e) => e.docupass_customid === userAddress
        );
        if (entry) {
          // Prepare the contract interaction
          const { request } = await publicClient.simulateContract({
            address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
            abi: creditManager,
            functionName: "verifyUser",
            args: [hashMessage(entry.documentNumber), userAddress],
            account,
          });
          // Execute the contract write
          const transactionHash = await client.writeContract(request);
          return transactionHash;
        }
      }
    }
    throw new Error("User not found in Vault");
  } catch (error) {
    console.error("Error in verifyUserOnContract:", error);
    throw error;
  }
};

export default verifyUserOnContract;
