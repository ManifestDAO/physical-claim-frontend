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
import coopIcon from "../../assets/nftimages/t-shirt-1-cooperation.gif";
import protectionIcon from "../../assets/nftimages/t-shirt-2-protection.gif";
import growthIcon from "../../assets/nftimages/t-shirt-3-growth.gif";
import creationIcon from "../../assets/nftimages/01_creation.gif";
import abundanceIcon from "../../assets/nftimages/02_abundance.gif";
import flowIcon from "../../assets/nftimages/03_flow.gif";

function Inventory() {
  const { account, chainId, activate, deactivate } = useWeb3React();
  const [shopUp, setShopUp] = useState(false);
  const [connectMenu, setConnectMenu] = useState(false);

  const dispatch = useDispatch();

  const emptySlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">EMPTY SLOT</h1>
    </div>
  );

  const coopSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">COOPERATION</h1>
      <img className="nft-image" src={coopIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
    </div>
  );

  const growthSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">GROWTH</h1>
      <img className="nft-image" src={growthIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
    </div>
  );

  const protectionSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">PROTECTION</h1>
      <img className="nft-image" src={protectionIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
    </div>
  );

  const abundanceSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">ABUNDANCE</h1>
      <img className="nft-image" src={abundanceIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
    </div>
  );

  const flowSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">FLOW</h1>
      <img className="nft-image" src={flowIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
    </div>
  );

  const creationSlot: JSX.Element = (
    <div className="nft-card">
      <h1 className="nft-title">CREATION</h1>
      <img className="nft-image" src={creationIcon} />
      <h3 className="nft-quantity">Login to claim</h3>
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

  const storeArray: JSX.Element[] = [
    coopSlot,
    protectionSlot,
    growthSlot,
    creationSlot,
    abundanceSlot,
    flowSlot,
  ];

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
    if (chainId !== chainIds.ETH_MAINNET) return;
    dispatch(getAccountInfo({ account: account }));
  }, [account, dispatch, chainId]);

  useEffect(() => {
    if (chainId !== chainIds.ETH_MAINNET && account !== undefined) {
      window.alert("Connect to Ethereum Mainnet");
      deactivate();
    }
  }, [chainId, account, deactivate]);

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
          <div className="nft-chunk">{storeArray}</div>
        </div>
      )}
    </div>
  );
}

export default Inventory;
