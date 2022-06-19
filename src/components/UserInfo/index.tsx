import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import "./index.css";
import MMIcon from "../../assets/walleticons/mmicon.png";
import WCIcon from "../../assets/walleticons/wcicon.png";
import { useWeb3React } from "@web3-react/core";
import { changeProvider } from "../../slices/AccountSlice";
import { clear } from "../../slices/NFTSlice";
import { METAMASK } from "../../constants/general";

export default function UserInfo() {
  const { deactivate } = useWeb3React();
  const dispatch = useDispatch();

  const walletprovider = useSelector(
    (state: RootState) => state.account.provider
  );
  const address = useSelector((state: RootState) => state.account.address);

  const logOut = () => {
    dispatch(changeProvider(undefined));
    deactivate();
    dispatch(clear({ klima: [], genesis: [] }));
  };

  return (
    <div className="user-info" onClick={() => logOut()}>
      {walletprovider === METAMASK ? (
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
