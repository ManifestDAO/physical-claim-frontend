import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "./slices/AccountSlice";
import { RootState } from "./store";
import NFTCard from "./components/NFTCard/index";
import Navbar from "./components/Navbar";
import Welcome from "./views/Welcome";
import ShopUp from "./components/ShopUp";

function App() {
  const { account, chainId } = useWeb3React();
  const [shopUp, setShopUp] = useState(false);

  const dispatch = useDispatch();

  const address = useSelector((state: RootState) => state.account.address);

  useEffect(() => {
    dispatch(getAccountInfo({ account: account }));
  }, [account]);

  return (
    <div className="App">
      <Welcome />
    </div>
  );
}

export default App;
