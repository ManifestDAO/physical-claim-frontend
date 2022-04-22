import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";

const getLibrary = async (connector) => {
  const library = new Web3Provider(connector);
  return library;
};

export default function Root() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <App />
      </Provider>
    </Web3ReactProvider>
  );
}
