import React, { useEffect, useState } from "react";
import "./index.css";
import loading from "../../assets/logos/mnfstloader.gif";
import { ShirtNames, ShirtImages } from "../../constants/shirtIds";
import { useDispatch, useSelector } from "react-redux";
import { getNFTInfo } from "../../slices/NFTSlice";
import { RootState } from "../../store";
import { useWeb3React } from "@web3-react/core";
import { update } from "../../slices/OrderSlice";

interface NFTCardProps {
  shopUp: boolean;
  setShopUp: any;
}

const NFTCard: React.FC<NFTCardProps> = function ({ shopUp, setShopUp }) {
  const { chainId } = useWeb3React();
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(NaN);

  const address = useSelector((state: RootState) => state.account.address);
  const nfts = useSelector((state: RootState) => state.nfts.nfts);
  const status = useSelector((state: RootState) => state.nfts.status);

  useEffect(() => {
    try {
      dispatch(
        update({
          type: "update_nft",
          key: ["nft_address", "nft_tokenid"],
          value: [nfts[selected].contract.address, nfts[selected].id.tokenId],
        })
      );
    } catch (err) {
      console.log(err);
    }
  }, [selected]);

  useEffect(() => {
    try {
      dispatch(getNFTInfo({ address: address, chainId: chainId }));
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
      <h1 className="title">CLAIMABLE NFTS</h1>
      {status !== "success" ? (
        <img src={loading} alt="LOADING NFTS" className="loading" />
      ) : (
        nfts.map((item: any, index: number) => (
          <div
            className={selected === index ? "nft-card active" : "nft-card"}
            onClick={() => setSelected(index)}
            key={index}
          >
            <h1 className="nft-title">{ShirtNames[item.id.tokenId]}</h1>
            <img
              src={ShirtImages[item.id.tokenId]}
              alt="nft"
              className="nft-image"
            />
            {selected === index ? (
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
  );
};

export default NFTCard;
