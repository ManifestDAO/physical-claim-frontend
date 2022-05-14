import { useWeb3React } from "@web3-react/core";
import React, { ChangeEvent, useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import {
  KlimaShirtNames,
  KlimaShirtImages,
  GenesisShirtImages,
  GenesisShirtNames,
} from "../../constants/shirtIds";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../slices/OrderSlice";
import { RootState } from "../../store";
import "./index.css";
import { sizeIds } from "../../constants/sizeIds";
import NFTSlice from "../../slices/NFTSlice";

interface OrderFormProps {
  setLoading: any;
  setApiReturn: any;
}

const OrderForm: React.FC<OrderFormProps> = ({ setLoading, setApiReturn }) => {
  const { library } = useWeb3React();
  const [error, setError] = useState(false);
  const order = useSelector((state: RootState) => state.order);
  const address = useSelector((state: RootState) => state.account.address);
  const dispatch = useDispatch();

  const changeHandler = (event: any) => {
    dispatch(
      update({
        type: "update_info",
        value: event.target.value,
        key: event.target.id,
      })
    );
  };

  const handleCountryChange = (value: string, e: any) => {
    dispatch(
      update({
        type: "update_info",
        value: value,
        key: "country_code",
      })
    );
    var index = e.nativeEvent.target.selectedIndex;
    dispatch(
      update({
        type: "update_info",
        value: e.nativeEvent.target[index].text,
        key: "country",
      })
    );
  };

  const handleRegionChange = (id: string, e: any) => {
    dispatch(
      update({
        type: "update_region",
        key: id,
      })
    );
    var index = e.nativeEvent.target.selectedIndex;
    dispatch(
      update({
        type: "update_info",
        key: "state",
        value: e.nativeEvent.target[index].text,
      })
    );
    dispatch(
      update({
        type: "update_info",
        key: "province",
        value: e.nativeEvent.target[index].text,
      })
    );
  };

  async function signMessage(address: string, library: any) {
    try {
      const provider = await library;
      const signer = await provider.getSigner();
      const signature = await signer.signMessage("Verify Wallet");

      return {
        address,
        signature,
        message: "Verify Wallet",
      };
    } catch (err) {
      console.log(err);
    }
  }

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      order.nft_address === "" ||
      order.nft_tokenid === "" ||
      order.size === "" ||
      order.first_name === "" ||
      order.last_name === "" ||
      order.address1 === "" ||
      order.city === "" ||
      order.zip === "" ||
      order.state === "" ||
      order.province === "" ||
      order.country === ""
    ) {
      setError(true);
      return;
    }
    setError(false);

    const signature = await signMessage(address, library);

    var request = require("request");
    var options = {
      method: "POST",
      url: "https://inventory.manifest.gg/api/v1/order",
      headers: {
        signature: signature?.signature,
        message: signature?.message,
        address: address,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nft_address: order.nft_address,
        nft_tokenid: order.nft_tokenid,
        size: order.size,
        email: order.email,
        first_name: order.first_name,
        last_name: order.last_name,
        address1: order.address1,
        address2: order.address2,
        city: order.city,
        state: order.state,
        zip: order.zip,
        country: order.country,
        country_code: order.country_code,
        province: order.province,
        province_code: order.province_code,
      }),
    };

    setLoading(true);
    console.log(
      JSON.stringify({
        nft_address: order.nft_address,
        nft_tokenid: order.nft_tokenid,
        size: order.size,
        email: order.email,
        first_name: order.first_name,
        last_name: order.last_name,
        address1: order.address1,
        address2: order.address2,
        city: order.city,
        state: order.state,
        zip: order.zip,
        country: order.country,
        country_code: order.country_code,
        province: order.province,
        province_code: order.province_code,
      })
    );

    request(options, function (error: any, response: any) {
      if (error) setApiReturn("Something Went Wrong!");
      setLoading(false);
      console.log(response.body);
    });
  };

  return (
    <form className="order-form" onSubmit={(event) => submit(event)}>
      {order.product === "klima" ? (
        <div className="top-chunk">
          <h2>Ordering: Klima {KlimaShirtNames[order.nft_tokenid]} T-Shirt</h2>
          <h3>Size: {sizeIds[order.size]}</h3>
          <img
            src={KlimaShirtImages[order.nft_tokenid as any]}
            className="order-image"
            alt="NFT Image"
          />
        </div>
      ) : (
        <div className="top-chunk">
          <h2>
            Ordering: Genesis {GenesisShirtNames[order.nft_tokenid]} Hoodie
          </h2>
          <h3>Size: {sizeIds[order.size]}</h3>
          <img
            src={GenesisShirtImages[order.nft_tokenid as any]}
            className="order-image"
            alt="NFT Image"
          />
        </div>
      )}

      <div className="form-chunk">
        <h3>Personal Info</h3>
        <div className="order-input name">
          <label htmlFor="first_name">First*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="first_name"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input name">
          <label htmlFor="last_name">Last*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="last_name"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input">
          <label htmlFor="email">Email</label>
          <input
            className="order-input-box"
            id="email"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>
      </div>

      <div className="form-chunk">
        <h3>Delivery Info</h3>
        <div className="order-input">
          <label htmlFor="address1">Address*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="address1"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input">
          <label htmlFor="address1">Address Line 2</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="address2"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input">
          <label htmlFor="city">City/Town*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="city"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input">
          <label htmlFor="zip">ZIP/Postal*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <input
            className="order-input-box"
            id="zip"
            type="text"
            onChange={(event) => changeHandler(event)}
          />
        </div>

        <div className="order-input">
          <label htmlFor="country-dropdown">Country*</label>
          {error ? <p className="error-text">Required Field</p> : ""}
          <CountryDropdown
            id="country"
            value={order.country_code}
            valueType="short"
            priorityOptions={["CA", "US", "GB", "AU"]}
            onChange={(value: string, e: ChangeEvent<Element>) =>
              handleCountryChange(value, e)
            }
          />
        </div>

        {order.country !== "" ? (
          <div className="order-input">
            <label htmlFor="region-dropdown">Region*</label>
            {error ? <p className="error-text">Required Field</p> : ""}
            <RegionDropdown
              id="region"
              country={order.country_code}
              countryValueType="short"
              value={order.province_code}
              valueType="short"
              onChange={handleRegionChange}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="form-chunk">
        <input className="btn" type="submit" value="MANIFEST" />
      </div>
    </form>
  );
};

export default OrderForm;
