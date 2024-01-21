import { http, createConfig } from "wagmi";
import { arbitrumGoerli } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const config = createConfig({
  chains: [arbitrumGoerli],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Create Wagmi" }),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  ssr: true,
  transports: {
    [arbitrumGoerli.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
