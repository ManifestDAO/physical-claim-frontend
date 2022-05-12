import React, { useState } from "react";
import OrderForm from "../OrderForm";
import MNFSTLoader from "../../assets/logos/mnfstloader.gif";
import "./index.css";

interface ShopUpProps {
  setShopUp: any;
}

const ShopUp: React.FC<ShopUpProps> = function ({ setShopUp }) {
  const [loading, setLoading] = useState(false);
  const [apiReturn, setApiReturn] = useState();

  return (
    <div className="shopup">
      <div className="shopup-inner">
        <p className="closebtn" onClick={() => setShopUp(false)}>
          CLOSE
        </p>
        {loading ? (
          <img src={MNFSTLoader} />
        ) : apiReturn ? (
          <h1>{apiReturn}</h1>
        ) : (
          <OrderForm setLoading={setLoading} setApiReturn={setApiReturn} />
        )}
      </div>
    </div>
  );
};

export default ShopUp;
