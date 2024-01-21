'use server'
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyMessage } from '@wagmi/core';
import { config } from './wagmi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { signature, address, message } = req.body;
      // Assuming verifyMessage is a function that verifies the signature and returns a boolean
      const isValid = await verifyMessage(config,{ signature, address, message });
      res.status(200).json({ isValid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
