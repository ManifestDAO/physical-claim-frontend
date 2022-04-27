import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo } from "./slices/AccountSlice";
import { RootState } from "./store";
import NFTCard from "./components/NFTCard/index";
import Navbar from "./components/Navbar";
import ConnectButton from "./components/ConnectButton";

function App() {
  const { account } = useWeb3React();

  const dispatch = useDispatch();

  const address = useSelector((state: RootState) => state.account.address);

  useEffect(() => {
    dispatch(getAccountInfo({ account: account }));
  }, [account]);

  return (
    <div className="App">
      {account ? (
        <>
          <Navbar />
          <NFTCard />
        </>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
}

export default App;
