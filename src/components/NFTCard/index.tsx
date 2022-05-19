import React, { useEffect, useState } from "react";
import "./index.css";
import loading from "../../assets/logos/mnfstloader.gif";
import {
  KlimaShirtNames,
  KlimaShirtImages,
  GenesisShirtNames,
  GenesisShirtImages,
} from "../../constants/shirtIds";
import { useDispatch, useSelector } from "react-redux";
import { getNFTInfo, clear } from "../../slices/NFTSlice";
import { RootState } from "../../store";
import { useWeb3React } from "@web3-react/core";
import { update } from "../../slices/OrderSlice";

interface NFTCardProps {
  shopUp: boolean;
  setShopUp: any;
}

const NFTCard: React.FC<NFTCardProps> = function ({ shopUp, setShopUp }) {
  const { chainId, library } = useWeb3React();
  const dispatch = useDispatch();

  const [klimaSelected, setKlimaSelected] = useState<any>();
  const [genesisSelected, setGenesisSelected] = useState<any>();

  const address = useSelector((state: RootState) => state.account.address);
  const balances = useSelector((state: RootState) => state.nfts.balances);
  const nfts = useSelector((state: RootState) => state.nfts.nfts);
  const status = useSelector((state: RootState) => state.nfts.status);

  useEffect(() => {
    if (klimaSelected === undefined) return;
    try {
      dispatch(
        update({
          type: "update_nft",
          key: ["nft_address", "nft_tokenid", "product"],
          value: [
            nfts.klima[klimaSelected].contract.address,
            nfts.klima[klimaSelected].id.tokenId,
            "klima",
          ],
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [klimaSelected]);

  useEffect(() => {
    if (genesisSelected === undefined) return;
    try {
      dispatch(
        update({
          type: "update_nft",
          key: ["nft_address", "nft_tokenid", "product"],
          value: [
            nfts.genesis[genesisSelected].contract.address,
            nfts.genesis[genesisSelected].id.tokenId,
            "genesis",
          ],
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [genesisSelected]);

  useEffect(() => {
    if (address === undefined) return;
    try {
      dispatch(clear({ klima: [], genesis: [] }));
      dispatch(
        getNFTInfo({ address: address, chainId: chainId, library: library })
      );
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  const handleChange = (event: any) => {
    dispatch(
      update({
        type: "update_size",
        key: "size",
        value: event.target.value,
      })
    );
  };

  return (
    <div className={shopUp ? "nft-screen-bg" : "nft-screen"}>
      <div className="nft-chunk">
        <h1 className="title">Klima T-Shirts</h1>
        {status !== "success" ? (
          <img src={loading} alt="LOADING NFTS" className="loading" />
        ) : (
          nfts.klima.map((item: any, index: number) => (
            <div
              className={
                klimaSelected === index ? "nft-card active" : "nft-card"
              }
              onClick={() => {
                setKlimaSelected(index);
                setGenesisSelected(undefined);
              }}
              key={index}
            >
              <h1 className="nft-title">{KlimaShirtNames[item.id.tokenId]}</h1>
              <img
                src={KlimaShirtImages[item.id.tokenId]}
                alt="nft"
                className="nft-image"
              />
              <h3 className="nft-quantity">
                x{balances.kliBal[item.id.tokenId]}
              </h3>
              {klimaSelected === index ? (
                <div className="claiminfo">
                  <label
                    className="nft-dropdown"
                    htmlFor="tshirt-size"
                    id="tshirt-size"
                  >
                    Select your size:
                    <select
                      className="nft-size-options"
                      name="tshirt-size"
                      onChange={(event) => handleChange(event)}
                    >
                      <option value="xs">XS - Extra Small</option>
                      <option value="s">S - Small</option>
                      <option value="medium">M - Medium</option>
                      <option value="l">L - Large</option>
                      <option value="xl">XL - Extra Large</option>
                      <option value="xxl">XXL - Double Extra Large</option>
                    </select>
                  </label>
                  <button className="btn" onClick={() => setShopUp(true)}>
                    MANIFEST
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>

      <div className="nft-chunk">
        <h1 className="title">Genesis Hoodies</h1>
        {status !== "success" ? (
          <img src={loading} alt="LOADING NFTS" className="loading" />
        ) : (
          nfts.genesis.map((item: any, index: number) => (
            <div
              className={
                genesisSelected === index ? "nft-card active" : "nft-card"
              }
              onClick={() => {
                setGenesisSelected(index);
                setKlimaSelected(undefined);
              }}
              key={index}
            >
              <h1 className="nft-title">
                {GenesisShirtNames[item.id.tokenId]}
              </h1>
              <img
                src={GenesisShirtImages[item.id.tokenId]}
                alt="nft"
                className="nft-image"
              />
              <h3 className="nft-quantity">
                x{balances.genBal[item.id.tokenId]}
              </h3>
              {genesisSelected === index ? (
                <div className="claiminfo">
                  <label
                    className="nft-dropdown"
                    htmlFor="tshirt-size"
                    id="tshirt-size"
                  >
                    Select your size:
                    <select
                      className="nft-size-options"
                      name="tshirt-size"
                      onChange={(event) => handleChange(event)}
                    >
                      <option value="xs">XS - Extra Small</option>
                      <option value="s">S - Small</option>
                      <option value="medium">M - Medium</option>
                      <option value="l">L - Large</option>
                      <option value="xl">XL - Extra Large</option>
                      <option value="xxl">XXL - Double Extra Large</option>
                    </select>
                  </label>
                  <button className="btn" onClick={() => setShopUp(true)}>
                    MANIFEST
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NFTCard;
