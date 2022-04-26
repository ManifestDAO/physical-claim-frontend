import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import {
  MetaMask,
  resetWalletConnectConnector,
  WalletConnect,
} from "./helpers/connectors";
import { useDispatch, useSelector } from "react-redux";
import { createAlchemyWeb3, GetNftsResponse } from "@alch/alchemy-web3";
import { getAccountInfo } from "./slices/AccountSlice";
import { RootState } from "./store";

function App() {
  const { activate, account, library } = useWeb3React();
  const [nft, setNFTs] = useState<GetNftsResponse>()

  const dispatch = useDispatch();

  const address = useSelector((state: RootState) => state.account.address);

  useEffect(() => {
    dispatch(getAccountInfo({ account: account }));
  }, [account]);

  const connect = async () => {
    await activate(MetaMask);
  };

  const wcConnect = async () => {
    resetWalletConnectConnector(WalletConnect);
    await activate(WalletConnect);
  };

  async function fetchEm(addy: string) {
    const web3 = createAlchemyWeb3('https://eth-rinkeby.alchemyapi.io/v2/SLyMsDV9L2ZfKBGSA5Wu9skVJCRjioha')
    const nfts = await web3.alchemy.getNfts({owner: addy})
    
    setNFTs(nfts)
    console.log(nft)
}

  return (
    <div className="App">
      <nav>
        <div className="navbtns">
          <h3>These will become one button:</h3>
          <button className="btn" onClick={() => connect()}>
            Connect with MetaMask
          </button>
          <button className="btn" onClick={() => wcConnect()}>
            Connect with WalletConnect
          </button>
          <button className='btn' onClick={() => {fetchEm(address)}}>
            Fetch NFTs
          </button>
        </div>
      </nav>
      <h1>Hello, {address}</h1>
      <h2>{nft ? 'Claimable NFTS will be shown here' as string | any : nft as GetNftsResponse | any}</h2>
    </div>
  );
}

export default App;
