import React from "react";
import MNFST from "../../assets/logos/logo-mnfst.png";
import ConnectButton from "../../components/ConnectButton";
import "./index.css";

export default function Welcome() {
  return (
    <div className="welcome">
      <img src={MNFST} alt="manifestlogo" className="mnfst" />
      <h1 className="welcometext">CONNECT YOUR WALLET:</h1>
      <ConnectButton />
    </div>
  );
}
