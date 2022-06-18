import React from "react";
import "./index.css";
import MMIcon from "../../assets/walleticons/mmicon.png";
import WCIcon from "../../assets/walleticons/wcicon.png";
import { useDispatch } from "react-redux";
import { changeProvider } from "../../slices/AccountSlice";
import { useConnect } from "wagmi";
import { metaMask, walletConnect } from "../../helpers/connectors";

interface Connect {
  setConnectMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectMenu = ({ setConnectMenu }: Connect) => {
  const { connect } = useConnect();
  const dispatch = useDispatch();

  const metaConnect = async () => {
    await connect(metaMask);
    setConnectMenu(false);
    dispatch(changeProvider("metamask"));
  };

  const wcConnect = async () => {
    await connect(walletConnect);
    setConnectMenu(false);
    dispatch(changeProvider("walletconnect"));
  };

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
