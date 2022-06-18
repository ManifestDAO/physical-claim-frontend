import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from "@ethersproject/providers";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { WagmiConfig, createClient } from "wagmi";

const client = createClient();

export default function Root() {
  return (
    <WagmiConfig client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </WagmiConfig>
  );
}
