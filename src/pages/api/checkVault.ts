"use server";

import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import verifyUserOnContract from "./verifyUserContract";

const checkVault = async (req: NextApiRequest, res: NextApiResponse) => {
  const apiKey = process.env.ENV_DOCU_API_KEY; // Ensure you have your API key in environment variables
  const { address } = req.body;

  if (req.method === "POST") {
    try {
      // Call the vault API to check for the user's address
      const vaultResponse = await axios.post(
        "https://api.idanalyzer.com/vault/list",
        {
          apikey: apiKey,
          filter: `docupass_customid = ${address}`,
        }
      );
      console.log("Total", vaultResponse.data.total);
      if (vaultResponse.data.total == 0) {
        return res.status(200).json({ status: "NA" });
      } else {
        // Check if there's a valid entry with docupass_success
        const entry = vaultResponse.data.items.find(
          (e) => e.docupass_customid === address
        );
        if (entry) {
          if (entry.docupass_success === "1") {
            verifyUserOnContract(address);
            return res.status(200).json({ status: "true" });
          } else if (entry.docupass_success === "0") {
            return res.status(200).json({
              status: "Not Verified",
              reason: entry.docupass_failedreason,
            });
          }
        }

        // If no entry was found or the entry does not have a docupass_success field
        return res.status(404).json({ status: "Not Found" });
      }
    } catch (error) {
      // Handle errors (e.g., network issues, invalid API key, etc.)
      return res.status(500).json({ error: error.message });
    }
  } else {
    // If the method is not POST, return a 405 Method Not Allowed status
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default checkVault;
