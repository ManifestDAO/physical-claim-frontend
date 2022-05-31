import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { NavData } from "./NavData";
import LOGO from "../../assets/logos/manifestlogo.svg";

export default function Navbar() {
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
