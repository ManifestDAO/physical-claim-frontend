import React, { useEffect, useState } from "react";
import "./index.css";
import IMAGE1 from "../../assets/nftimages/t-shirt-1-cooperation.gif";
import IMAGE2 from "../../assets/nftimages/t-shirt-2-protection.gif";
import IMAGE3 from "../../assets/nftimages/t-shirt-3-growth.gif";
import loading from "../../assets/logos/mnfstloader.gif";
import { useDispatch, useSelector } from "react-redux";
import { getNFTInfo } from "../../slices/NFTSlice";
import { RootState } from "../../store";

interface NFTCardProps {
  setShopUp: any;
}

const NFTCard: React.FC<NFTCardProps> = function ({ setShopUp }) {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(NaN);

  const address = useSelector((state: RootState) => state.account.address);
  const nfts = useSelector((state: RootState) => state.nfts.nfts);
  const status = useSelector((state: RootState) => state.nfts.status);

  useEffect(() => {
    dispatch(getNFTInfo({ address: address }));
    console.log(nfts);
  }, [address]);
  return (
    <div className="nft-screen">
      <h1 className="title">CLAIMABLE NFTS</h1>
      {status !== "success" ? (
        <img src={loading} alt="LOADING NFTS" className="loading" />
      ) : (
        nfts.map((item: any, index: number) => (
          <div
            className={selected === index ? "nft-card active" : "nft-card"}
            onClick={() => setSelected(index)}
          >
            <h1 className="nft-title">
              {item.id.tokenId === "1"
                ? "Co-Operation"
                : item.id.tokenId === "2"
                ? "Protection"
                : item.id.tokenId === "3"
                ? "Growth"
                : ""}
            </h1>
            <img
              src={
                item.id.tokenId === "1"
                  ? IMAGE1
                  : item.id.tokenId === "2"
                  ? IMAGE2
                  : IMAGE3
              }
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
                  <select name="tshirt-size">
                    <option value="xs">XS - Extra Small</option>
                    <option value="s">S - Small</option>
                    <option value="medium">M - Medium</option>
                    <option value="l">L - Large</option>
                    <option value="xl">XL - Extra Large</option>
                    <option value="xxl">XXL - Double Extra Large</option>
                  </select>
                </label>
                <button className="btn" onClick={() => setShopUp(true)}>
                  CLAIM
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
