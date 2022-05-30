import { useWeb3React } from "@web3-react/core";
import React from "react";
import { Link } from "react-router-dom";
import ConnectButton from "../ConnectButton";
import UserInfo from "../UserInfo";
import "./index.css";
import { NavData } from "./NavData";
import LOGO from "../../assets/logos/manifestlogo.svg";

export default function Navbar() {
  const { account } = useWeb3React();

  return (
    <nav className="navbar">
      <img src={LOGO} className="nav-logo" alt="logo" />
      {NavData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              <span>{item.id}</span>
            </Link>
          </li>
        );
      })}
    </nav>
  );
}
