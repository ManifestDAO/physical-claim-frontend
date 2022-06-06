import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import "./index.css";
import { useDispatch } from "react-redux";
import { changeProvider, getAccountInfo } from "../../slices/AccountSlice";
import { chainIds } from "../../constants/chainIds";
import NFTCard from "../../components/NFTCard/index";
import ShopUp from "../../components/ShopUp";
import {
  MetaMask,
  resetWalletConnectConnector,
  WalletConnect,
} from "../../helpers/connectors";
import ConnectButton from "../../components/ConnectButton";
import UserInfo from "../../components/UserInfo";

function Inventory() {
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
    if (chainId !== 4) return;
    dispatch(getAccountInfo({ account: account }));
  }, [account, dispatch, chainId]);

  useEffect(() => {
    if (chainId !== chainIds.ETH_RINKEBY_TESTNET && account !== undefined) {
      window.alert("Connect to Rinkeby Testnet");
      deactivate();
    }
  }, [chainId, account, deactivate]);

  return (
    <div className="inventory">
      <nav className={shopUp ? "inventory-nav-bg" : "inventory-nav"}>
        {account === undefined ? <ConnectButton /> : <UserInfo />}
      </nav>
      <h1 className={shopUp ? "inventory-title-bg" : "inventory-title"}>
        INVENTORY
      </h1>
      {shopUp ? <ShopUp setShopUp={setShopUp} /> : ""}
      {account === undefined || chainId !== 4 ? (
        <p>You are not connected</p>
      ) : (
        <NFTCard shopUp={shopUp} setShopUp={setShopUp} />
      )}
    </div>
  );
}

export default Inventory;
