import React from "react";
import MNFST from "../../assets/logos/logo-mnfst.png";
import ConnectButton from "../../components/ConnectButton";
import "./index.css";

export default function Welcome() {
  return (
    <div className="welcome">
      <a href="https://app.manifest.gg">
        <img src={MNFST} alt="manifestlogo" className="mnfst" />
      </a>
      <a href="https://app.manifest.gg">
        <h1 className="welcometext">COMING SOON</h1>
      </a>
    </div>
  );
}
