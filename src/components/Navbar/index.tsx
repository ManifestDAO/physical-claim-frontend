import React from "react";
import { Link } from "react-router-dom";
import UserInfo from "../UserInfo";
import "./index.css";
import { NavData } from "./NavData";

export default function Navbar() {
  return (
    <nav className="navbar">
      {NavData.map((item, index) => {
        return (
          <li key={index} className={item.cName}>
            <Link to={item.path}>
              <span>{item.id}</span>
            </Link>
          </li>
        );
      })}
      <UserInfo />
    </nav>
  );
}
