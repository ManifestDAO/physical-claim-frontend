import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import {
  MetaMask,
  resetWalletConnectConnector,
  WalletConnect,
} from "./helpers/connectors";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "./slices/AccountSlice";
import { RootState } from "./store";

function App() {
  const { activate, account, library } = useWeb3React();

  const dispatch = useDispatch();

  const address = useSelector((state: RootState) => state.account.address);

  useEffect(() => {
    dispatch(getAccountInfo({ account: account }));
  }, [account]);

  const connect = async () => {
    await activate(MetaMask);
  };

  const wcConnect = async () => {
    resetWalletConnectConnector(WalletConnect);
    await activate(WalletConnect);
  };

  return (
    <div className="App">
      <nav>
        <div className="navbtns">
          <h3>These will become one button:</h3>
          <button className="btn" onClick={() => connect()}>
            Connect with MetaMask
          </button>
          <button className="btn" onClick={() => wcConnect()}>
            Connect with WalletConnect
          </button>
        </div>
      </nav>
      <h1>Hello, {address}</h1>
      <h2>Claimable NFTS will be shown here</h2>
    </div>
  );
}

export default App;
