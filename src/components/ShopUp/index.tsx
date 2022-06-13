import React, { useState } from "react";
import OrderForm from "../OrderForm";
import success from "../../assets/order/success-icon.png";
import failure from "../../assets/order/failure-icon.png";
import "./index.css";
import { useWeb3React } from "@web3-react/core";

interface ShopUpProps {
  setShopUp: any;
}

const ShopUp: React.FC<ShopUpProps> = function ({ setShopUp }) {
  const { account } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(``);
  const [apiReturn, setApiReturn] = useState("");

  return (
    <div className="shopup">
      <div
        className={
          apiReturn === ""
            ? "shopup-inner"
            : apiReturn === "failure"
            ? "shopup-inner-failure"
            : "shopup-inner-success"
        }
      >
        <p className="closebtn" onClick={() => setShopUp(false)}>
          X
        </p>
        {apiReturn === "" ? (
          <OrderForm
            setLoading={setLoading}
            setApiReturn={setApiReturn}
            setResponse={setResponse}
          />
        ) : apiReturn === "success" ? (
          <div className="order-success">
            <p className="order-success-title">SUCCESS</p>
            <img src={success} alt="success" />
            <p className="order-success-info">Your order has been received!</p>
            <p className="order-id">{response}</p>
          </div>
        ) : (
          <div className="order-failure">
            <p className="order-failure-title">ERROR</p>
            <img src={failure} alt="failure" />
            <p className="order-failure-info">An error occured!</p>
            <p className="order-error">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopUp;
