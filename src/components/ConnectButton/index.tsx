import React from "react";
import "./index.css";
import MMIcon from "../../assets/walleticons/mmicon.png";
import WCIcon from "../../assets/walleticons/wcicon.png";
import { useWeb3React } from "@web3-react/core";
import {
  MetaMask,
  resetWalletConnectConnector,
  WalletConnect,
} from "../../helpers/connectors";
import { useDispatch } from "react-redux";
import { changeProvider } from "../../slices/AccountSlice";

export default function ConnectButton() {
  const { activate } = useWeb3React();
  const dispatch = useDispatch();

  const metaConnect = async () => {
    await activate(MetaMask);
    dispatch(changeProvider("metamask"));
  };

  const wcConnect = async () => {
    resetWalletConnectConnector();
    await activate(WalletConnect);
    dispatch(changeProvider("walletconnect"));
  };

  return (
    <div className="connect-btn">
      <button className="metamask-btn" onClick={() => metaConnect()}>
        <img src={MMIcon} alt="MetaMaskIcon" className="walleticon" />
      </button>
      <button className="walletconnect-btn" onClick={() => wcConnect()}>
        <img src={WCIcon} alt="WalletConnectIcon" className="walleticon" />
      </button>
    </div>
  );
}
