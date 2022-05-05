import React, { useState } from "react";
import { orderInputs } from "../../helpers/orderInputs";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import {
  changeCountry,
  changeRegion,
  changeInfo,
} from "../../slices/OrderInfoSlice";

const OrderForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const order = useSelector((state: RootState) => state.order);
  const country = useSelector((state: RootState) => state.order.country);
  const region = useSelector(
    (state: RootState) => state.order.state || state.order.province
  );

  const submit = () => {
    if (
      order.first_name === "" ||
      order.last_name === "" ||
      order.address1 === "" ||
      order.city === "" ||
      order.country === "" ||
      region === ""
    ) {
      console.log("ERROR");
      setError(true);
      return;
    }
    console.log(order);
    setError(false);
  };

  return (
    <div className="order-form">
      {orderInputs.map((item, index) => (
        <div className="order-inputs" key={index}>
          <p className="input-title">{item.input}</p>
          {item.required && error ? (
            <p className="error-text">Required Field</p>
          ) : (
            ""
          )}
          <input
            type={item.inputType}
            className="order-inputs"
            onChange={(val) =>
              dispatch(changeInfo([item.id, val.target.value]))
            }
          />
        </div>
      ))}
      <div className="dropdowns">
        <p className="input-title">Country*</p>
        {error ? <p className="error-text">Required Field</p> : ""}
        <CountryDropdown
          id="country-dropdown"
          value={country}
          onChange={(val) => dispatch(changeCountry(val))}
        />
        {country === "" ? (
          ""
        ) : (
          <>
            <p className="input-title">Region*</p>
            {error ? <p className="error-text">Required Field</p> : ""}
            <RegionDropdown
              id="region-dropdown"
              country={country}
              value={region}
              onChange={(val) => dispatch(changeRegion(val))}
            />
          </>
        )}
      </div>
      <div className="submit">
        <button className="btn submitbtn" onClick={() => submit()}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default OrderForm;
