import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";

export const account = privateKeyToAccount(process.env.PRIVATE_KEY);

export const client = createWalletClient({
  account,
  chain: sepolia,
  transport: http(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
  ),
});

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`
  ),
});
