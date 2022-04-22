import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector"

export const MetaMask = new InjectedConnector({
  supportedChainIds: [0x04],
});

export const WalletConnect = new WalletConnectConnector({
  rpc: {
  4: 'https://eth-rinkeby.gateway.pokt.network/v1/lb/624641008f496c003a4bc1fa'},
  qrcode: true,
  bridge: 'https://bridge.walletconnect.org'
})

export function resetWalletConnectConnector(connector) {
  if (connector && connector instanceof WalletConnectConnector){
      connector.walletConnectProvider = undefined;
  }
}