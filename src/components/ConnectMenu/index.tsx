import React, { useEffect } from "react";
import "./index.css";
import MMIcon from "../../assets/walleticons/mmicon.png";
import WCIcon from "../../assets/walleticons/wcicon.png";
import { useWeb3React } from "@web3-react/core";
import {
  MetaMask,
  metaMaskConnect,
  resetWalletConnectConnector,
  WalletConnect,
  walletConnectConnect,
} from "../../helpers/connectors";
import { useDispatch } from "react-redux";
import { changeProvider } from "../../slices/AccountSlice";
import { useAccount, useConnect } from "wagmi";

interface Connect {
  setConnectMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectMenu = ({ setConnectMenu }: Connect) => {
  // const { activate } = useWeb3React();

  const {
    activeConnector,
    connect,
    connectors,
    error,
    isConnecting,
    pendingConnector,
  } = useConnect();

  const { data } = useAccount();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const metaConnect = async () => {
    await connect(metaMaskConnect);
    setConnectMenu(false);
    dispatch(changeProvider("metamask"));
  };

  const wcConnect = async () => {
    await connect(walletConnectConnect);
    setConnectMenu(false);
    dispatch(changeProvider("walletconnect"));
  };

  // const metaConnect = async () => {
  //   await activate(MetaMask);
  //   setConnectMenu(false);
  //   dispatch(changeProvider("metamask"));
  // };

  // const wcConnect = async () => {
  //   resetWalletConnectConnector();
  //   await activate(WalletConnect);
  //   setConnectMenu(false);
  //   dispatch(changeProvider("walletconnect"));
  // };

  return (
    <div className="connect-menu-outer">
      <div className="connect-menu">
        <p
          className="connect-menu-close-btn"
          onClick={() => setConnectMenu(false)}
        >
          x
        </p>
        <p className="connect-menu-text">Connect Wallet</p>
        <button className="metamask-btn" onClick={() => metaConnect()}>
          <img src={MMIcon} alt="MetaMaskIcon" className="walleticon" />
          <span>MetaMask</span>
        </button>
        <button className="walletconnect-btn" onClick={() => wcConnect()}>
          <img src={WCIcon} alt="WalletConnectIcon" className="walleticon" />{" "}
          <span>WalletConnect</span>
        </button>
        <p className="wallet-info-guide">What is a wallet?</p>
      </div>
    </div>
  );
};

export default ConnectMenu;
