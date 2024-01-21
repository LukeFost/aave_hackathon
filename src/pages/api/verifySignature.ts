"use server";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyMessage } from "@wagmi/core";
import { config } from "../../wagmi";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { signature, address, message } = req.body;
      // Assuming verifyMessage is a function that verifies the signature and returns a boolean
      console.log(req.body);
      const isValid = await verifyMessage(config, {
        signature,
        address,
        message,
      });
      console.log(address, message, isValid);
      if (isValid) {
        console.log("docupass stuff has started!");
        // Check the existingLink flag sent from the client
        const existingLink = req.body.existingLink;

        // If there's already an existing link, skip the vault check and link creation
        if (existingLink) {
          return res.status(200).json({ message: "Existing link used." });
        }
        // Check if the address exists in the vault
        const vaultResponse = await axios.post(
          "https://api.idanalyzer.com/vault/list",
          {
            apikey: process.env.ENV_DOCU_API_KEY,
            filter: `docupass_customid = ${address}`,
          }
        );
        console.log(vaultResponse.data, vaultResponse.data.total);

        // If the address is not found in the vault, create a DocuPass link
        if (!vaultResponse.data || vaultResponse.data.total === 0) {
          const docuPassResponse = await axios.post(
            "https://api.idanalyzer.com/docupass/create",
            {
              type: "2",
              companyname: "Two Guys Engineering",
              maxattempt: "5",
              reusable: "0",
              biometric: "0",
              biometric_threshold: "0.3",
              authenticate_minscore: "0.2",
              authenticate_module: "2",
              phoneverification: "false",
              verify_expiry: "true",
              dualsidecheck: "true",
              aml_check: "true",
              aml_database: "eu_fsf",
              aml_strict_match: "false",
              contract_format: "pdf",
              vault_save: "true",
              return_documentimage: "true",
              return_faceimage: "true",
              return_type: "1",
              crop_document: "0",
              nobranding: "false",
              apikey: process.env.ENV_DOCU_API_KEY,
              customid: address, // Use address as custom ID
            }
          );

          if (docuPassResponse.data.error) {
            throw new Error(docuPassResponse.data.error.message);
          }

          // Return the DocuPass link to the user
          return res
            .status(200)
            .json({ docuPassLink: docuPassResponse.data.url });
        }

        // If the address exists, proceed with your logic
        return res
          .status(200)
          .json({ message: "Address exists in the vault." });
      } else {
        throw new Error("Signature verification failed.");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// if validity is true, begin the next function
// if validity is false, return the error saying its false
