import React from "react";
import '@rainbow-me/rainbowkit/dist/index.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Inventory from "./views/Inventory";
import "./App.css";


import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';



import { ConnectButton } from '@rainbow-me/rainbowkit';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.rinkeby],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const App = () => {
  return (
    <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
    <div className="App">
      <Router>
        <Navbar />
        <ConnectButton />
        <Routes>
          <Route key="1" path="/" element={<Home />} />
          <Route key="2" path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </div>
    </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
