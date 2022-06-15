import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { WagmiConfig, createClient } from "wagmi";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const client = createClient();

const getLibrary = async (connector: ExternalProvider | JsonRpcFetchFunc) => {
  const library = new Web3Provider(connector);
  return library;
};

export default function Root() {
  return (
    <WagmiConfig client={client}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <App />
        </Provider>
      </Web3ReactProvider>
    </WagmiConfig>
  );
}
