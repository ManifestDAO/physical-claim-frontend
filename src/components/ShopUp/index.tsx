import React from "react";
import OrderForm from "../OrderForm";
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
        <OrderForm />
      </div>
    </div>
  );
};

export default ShopUp;
