import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const metaMask = new MetaMaskConnector();

export const walletConnect = new WalletConnectConnector({
  options: {
    qrcode: true,
  },
});
