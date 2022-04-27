import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./index.css";
import MMIcon from "../../assets/walleticons/mmicon.png";
import WCIcon from "../../assets/walleticons/wcicon.png";

export default function UserInfo() {
  const walletprovider = useSelector(
    (state: RootState) => state.account.provider
  );
  const address = useSelector((state: RootState) => state.account.address);

  return (
    <div className="user-info">
      {walletprovider === "metamask" ? (
        <img src={MMIcon} alt="metamasklogo" className="walleticon-userinfo" />
      ) : (
        <img
          src={WCIcon}
          alt="walletconnectlogo"
          className="walleticon-userinfo"
        />
      )}
      <h2 className="userinfo-address">{address}</h2>
    </div>
  );
}
