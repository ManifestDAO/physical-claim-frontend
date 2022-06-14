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
import { METAMASK, WALLETCONNECT } from "../../constants/general";

function Inventory() {
  const { account, chainId, activate, deactivate } = useWeb3React();
  const [shopUp, setShopUp] = useState(false);

  const dispatch = useDispatch();

  const emptySlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">EMPTY SLOT</h1>
    </div>
  );

  const emptyArray: JSX.Element[] = [
    emptySlot,
    emptySlot,
    emptySlot,
    emptySlot,
    emptySlot,
    emptySlot,
  ];

  useEffect(() => {
    if (localStorage.getItem("Provider") === null) return;

    if (localStorage.getItem("Provider") === METAMASK) {
      activate(MetaMask);
      dispatch(changeProvider(METAMASK));
      return;
    }

    if (localStorage.getItem("Provider") === METAMASK) {
      resetWalletConnectConnector();
      activate(WalletConnect);
      dispatch(changeProvider(WALLETCONNECT));
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
      {account !== undefined ? (
        <NFTCard
          shopUp={shopUp}
          setShopUp={setShopUp}
          emptyArray={emptyArray}
        />
      ) : (
        <div className="nft-screen">
          <div className="nft-chunk">{emptyArray}</div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
