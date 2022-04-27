import React from "react";
import MNFST from "../../assets/logos/mnfstloader.gif";
import "./index.css";

interface ShopUpProps {
  setShopUp: any;
}

const ShopUp: React.FC<ShopUpProps> = function ({ setShopUp }) {
  return (
    <div className="shopup">
      <div className="shopup-inner">
        <p className="closebtn" onClick={() => setShopUp(false)}>
          CLOSE
        </p>
        <h1>SHOPIFY API WILL GO IN THIS POPUP</h1>
        <img src={MNFST} alt="loading" />
      </div>
    </div>
  );
};

export default ShopUp;
