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
import UserInfo from "../../components/UserInfo";
import ConnectMenu from "../../components/ConnectMenu";
import { useAccount, useNetwork } from "wagmi";

function Inventory() {
  // const { account, chainId, activate, deactivate } = useWeb3React();
  const [shopUp, setShopUp] = useState(false);
  const [connectMenu, setConnectMenu] = useState(false);
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState(4);

  const { data } = useAccount();
  const { activeChain } = useNetwork();

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
    if (data === undefined) return;
    if (data?.address === null) return;
    setAccount(data?.address as string);
  }, [data]);

  useEffect(() => {
    if (activeChain === undefined) return;
    setChainId(activeChain.id);
  }, [activeChain]);

  // useEffect(() => {
  //   if (localStorage.getItem("Provider") === null) return;
  //   if (localStorage.getItem("Provider") === "metamask") {
  //     activate(MetaMask);
  //     dispatch(changeProvider("metamask"));
  //     return;
  //   }
  //   if (localStorage.getItem("Provider") === "walletconnect") {
  //     resetWalletConnectConnector();
  //     activate(WalletConnect);
  //     dispatch(changeProvider("walletconnect"));
  //     return;
  //   }
  // }, [activate, dispatch]);

  useEffect(() => {
    if (chainId !== chainIds.ETH_RINKEBY_TESTNET) return;
    dispatch(getAccountInfo({ account: account }));
  }, [account, dispatch, chainId]);

  useEffect(() => {
    if (chainId !== chainIds.ETH_RINKEBY_TESTNET && account !== undefined) {
      window.alert("Connect to Rinkeby Testnet");
      // deactivate();
    }
  }, [chainId, account]);

  return (
    <div className="inventory">
      <nav className={shopUp ? "inventory-nav-bg" : "inventory-nav"}>
        {account === undefined ? (
          <button className="login-btn" onClick={() => setConnectMenu(true)}>
            Connect a Wallet
          </button>
        ) : (
          <UserInfo />
        )}
      </nav>
      <h1 className={shopUp ? "inventory-title-bg" : "inventory-title"}>
        INVENTORY
      </h1>
      {connectMenu ? <ConnectMenu setConnectMenu={setConnectMenu} /> : ""}
      {shopUp ? <ShopUp setShopUp={setShopUp} /> : ""}
      {account !== undefined ? (
        <NFTCard
          shopUp={shopUp}
          setShopUp={setShopUp}
          emptyArray={emptyArray}
        />
      ) : (
        <div className={shopUp || connectMenu ? "nft-screen-bg" : "nft-screen"}>
          <div className="nft-chunk">{emptyArray}</div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
