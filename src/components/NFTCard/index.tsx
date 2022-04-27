import React, { useEffect, useState } from "react";
import "./index.css";
import IMAGE from "../../assets/t-shirt-3-growth.gif";
import { useDispatch, useSelector } from "react-redux";
import { getNFTInfo } from "../../slices/NFTSlice";
import { RootState } from "../../store";

export default function NFTCard() {
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
      {status === "loading" ? (
        <h1>LOADING NFTS</h1>
      ) : (
        nfts.map((item: any, index: number) => (
          <div
            className={selected === index ? "nft-card active" : "nft-card"}
            onClick={() => setSelected(index)}
          >
            <h1 className="nft-title">{item.id.tokenId}</h1>
            <img src={IMAGE} alt="nft" className="nft-image" />
            {selected === index ? (
              <>
                <label
                  className="nft-dropdown"
                  htmlFor="tshirt-size"
                  id="tshirt-size"
                >
                  Select your size:
                  <select name="tshirt-size">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </label>
                <button className="btn">CLAIM</button>
              </>
            ) : (
              ""
            )}
          </div>
        ))
      )}
    </div>
  );
}
