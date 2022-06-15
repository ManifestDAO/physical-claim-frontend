import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector as WagmiConnectConnector } from "wagmi/connectors/walletConnect";

export const MetaMask = new InjectedConnector({});

export const WalletConnect = new WalletConnectConnector({
  rpc: {
    4: "https://eth-rinkeby.gateway.pokt.network/v1/lb/624641008f496c003a4bc1fa",
  },
  qrcode: true,
  bridge: "https://bridge.walletconnect.org",
});

export function resetWalletConnectConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector) {
    connector.walletConnectProvider = undefined;
  }
}

export const metaMaskConnect = new MetaMaskConnector();

export const walletConnectConnect = new WagmiConnectConnector({
  options: {
    qrcode: true,
  },
});
