import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { useDispatch } from "react-redux";
import { changeProvider, getAccountInfo } from "./slices/AccountSlice";
import { chainIds } from "./constants/chainIds";
import NFTCard from "./components/NFTCard/index";
import Navbar from "./components/Navbar";
import Welcome from "./views/Welcome";
import ShopUp from "./components/ShopUp";
import {
  MetaMask,
  resetWalletConnectConnector,
  WalletConnect,
} from "./helpers/connectors";

function App() {
  const { account, chainId, activate, deactivate } = useWeb3React();
  const [shopUp, setShopUp] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("Provider") === null) return;
    if (localStorage.getItem("Provider") === "metamask") {
      activate(MetaMask);
      dispatch(changeProvider("metamask"));
      return;
    }
    if (localStorage.getItem("Provider") === "walletconnect") {
      resetWalletConnectConnector();
      activate(WalletConnect);
      dispatch(changeProvider("walletconnect"));
      return;
    }
  }, [activate, dispatch]);

  useEffect(() => {
    dispatch(getAccountInfo({ account: account }));
  }, [account, dispatch]);

  useEffect(() => {
    if (chainId !== chainIds.ETH_RINKEBY_TESTNET && account !== undefined) {
      window.alert("Connect to Rinkeby Testnet");
      deactivate();
    }
  }, [chainId, account, deactivate]);

  return (
    <div className="App">
      {account ? (
        <>
          <Navbar />
          {shopUp ? <ShopUp setShopUp={setShopUp} /> : ""}
          <NFTCard shopUp={shopUp} setShopUp={setShopUp} />
        </>
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
