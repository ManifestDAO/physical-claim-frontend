import { useWeb3React } from "@web3-react/core";
import React, { ChangeEvent, useEffect, useState } from "react";
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
import { ethers } from "ethers";
import { ADDRESSES } from "../../constants/addresses";
import { BurnABI } from "../../constants/ABIs/BurnABI";
import { KlimaABI } from "../../constants/ABIs/KlimaABI";
import { useNetwork, useSigner } from "wagmi";

interface OrderFormProps {
  setLoading: any;
  setApiReturn: any;
  setResponse: any;
}

const OrderForm: React.FC<OrderFormProps> = ({
  setLoading,
  setApiReturn,
  setResponse,
}) => {
  // const { library, chainId } = useWeb3React();
  const [chainId, setChainId] = useState(4);

  const [error, setError] = useState(false);
  const [orderState, setOrderState] = useState("");
  const order = useSelector((state: RootState) => state.order);
  const address = useSelector((state: RootState) => state.account.address);
  const dispatch = useDispatch();

  const { activeChain } = useNetwork();
  const { data: library } = useSigner();

  useEffect(() => {
    console.log(library);
  }, [library]);

  useEffect(() => {
    if (activeChain === undefined) return;
    setChainId(activeChain.id);
  }, [activeChain]);

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
      const signer = await library;
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

  async function approve() {
    try {
      const signer: any = await library;
      const contract = new ethers.Contract(
        order.nft_address,
        KlimaABI[chainId as number],
        signer
      );
      const check = await contract.isApprovedForAll(
        address,
        ADDRESSES[chainId as number].BURN_CONTRACT
      );

      if (check === false) {
        const approved = await contract.setApprovalForAll(
          ADDRESSES[chainId as number].BURN_CONTRACT,
          true
        );

        const transaction = await approved.wait();
        return transaction;
      }
      const transaction = "already approved";
      return transaction;
    } catch (err) {
      console.log(err);
    }
  }

  async function burn(library: any, chainId: any) {
    try {
      const signer = await library;
      const contract = new ethers.Contract(
        ADDRESSES[chainId].BURN_CONTRACT,
        BurnABI[chainId],
        signer
      );
      const burned = await contract.burn(
        order.nft_address,
        order.nft_tokenid,
        1
      );

      const transaction = await burned.wait();

      return {
        transaction,
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
      setIsError(true);
      return;
    }

    setIsError(false);
    setOrderState("verifying");

    const signature = await signMessage(address, library);
    if (signature === undefined) {
      setApiReturn("failure");
      setResponse("Failed to verify ownership");
      return;
    }

    setOrderState("approving");
    const approvedReceipt = await approve();
    console.log(approvedReceipt);

    setOrderState("burning");
    const burned = await burn(library, chainId);
    if (burned === undefined) {
      setApiReturn("failure");
      setResponse("NFT not burned");
      return;
    }

    setOrderState("ordering");
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
        nft_tokenid: parseInt(order.nft_tokenid),
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

    request(options, function (error: any, response: any) {
      if (!response) {
        setApiReturn("failure");
        setResponse("ERROR: No API Response");
      }
      console.log(JSON.parse(response.body).message);
      if (
        response.body ===
        '{"message":"Something went wrong. error(Error: Product not found)"}'
      ) {
        setApiReturn("failure");
        setResponse(response.body);
      }
      if (error) {
        setApiReturn("failure");
        setResponse(`ERROR: ${error}`);
        setLoading(false);
        return;
      }
      if (!response.request.response.body.id) {
        setApiReturn("failure");
        setResponse("Something went wrong!");
      }
      setApiReturn("success");
      setResponse(`Order ID: ${response.request.response.body.id}`);
      setLoading(false);
    });
  };

  let formButton;

  switch (orderState) {
    case "":
      formButton = (
        <input className="order-btn" type="submit" value="MANIFEST" />
      );
      break;
    case "verifying":
      formButton = (
        <h2 className="order-action">Verifying ownership through wallet...</h2>
      );
      break;
    case "approving":
      formButton = <h2 className="order-action">Approving Burn...</h2>;
      break;
    case "burning":
      formButton = <h2 className="order-action">Burning NFT...</h2>;
      break;
    case "ordering":
      formButton = <h2 className="order-action">Placing order...</h2>;
      break;
    default:
      break;
  }

  return (
    <form className="order-form" onSubmit={(event) => submit(event)}>
      {order.product === "klima" ? (
        <div className="top-chunk">
          <img
            src={KlimaShirtImages[parseInt(order.nft_tokenid) as number]}
            className="order-image"
            alt="NFT"
          />
          <div className="order-description">
            <p className="order-description-title">
              {KlimaShirtNames[parseInt(order.nft_tokenid)]} T-Shirt
            </p>
            <p className="order-description-size">
              Size: {sizeIds[order.size]}
            </p>
          </div>
        </div>
      ) : (
        <div className="top-chunk">
          <img
            src={GenesisShirtImages[parseInt(order.nft_tokenid) as number]}
            className="order-image"
            alt="NFT"
          />
          <div className="order-description">
            <p className="order-description-title">
              {GenesisShirtNames[parseInt(order.nft_tokenid)]} Hoodie
            </p>
            <p className="order-description-size">
              Size: {sizeIds[order.size]}
            </p>
          </div>
        </div>
      )}

      <div className="form-chunk">
        <input
          placeholder="Name"
          className={
            error
              ? order.first_name === ""
                ? "order-input-error"
                : "order-input-success"
              : "order-input-box"
          }
          id="first_name"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
        <input
          placeholder="Surname"
          className={
            error
              ? order.last_name === ""
                ? "order-input-error"
                : "order-input-success"
              : "order-input-box"
          }
          id="last_name"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
        <input
          placeholder="Email"
          className="order-input"
          id="email"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
        <input
          placeholder="Address 1"
          className={
            error
              ? order.address1 === ""
                ? "order-input-error"
                : "order-input-success"
              : "order-input-box"
          }
          id="address1"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
        <input
          placeholder="Address 2"
          className="order-input"
          id="address2"
          type="text"
          onChange={(event) => changeHandler(event)}
        />

        <CountryDropdown
          id={
            error
              ? order.country === ""
                ? "country-error"
                : "country-success"
              : "country"
          }
          value={order.country_code}
          valueType="short"
          priorityOptions={["CA", "US", "GB", "AU"]}
          onChange={(value: string, e: ChangeEvent<Element>) =>
            handleCountryChange(value, e)
          }
        />

        <RegionDropdown
          id={
            error
              ? order.state === ""
                ? "region-error"
                : "region-success"
              : "region"
          }
          country={order.country_code}
          countryValueType="short"
          value={order.province_code}
          valueType="short"
          onChange={handleRegionChange}
        />

        <input
          placeholder="City"
          className={
            error
              ? order.city === ""
                ? "order-input-error"
                : "order-input-success"
              : "order-input-box"
          }
          id="city"
          type="text"
          onChange={(event) => changeHandler(event)}
        />

        <input
          placeholder="ZIP/Postal"
          className={
            error
              ? order.zip === ""
                ? "order-input-error"
                : "order-input-success"
              : "order-input-box"
          }
          id="zip"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
      </div>
      <div className="form-chunk">{formButton}</div>
      {error ? (
        <p className="order-error-text">
          You have not filled out all the required fields
        </p>
      ) : (
        ""
      )}
    </form>
  );
};

export default OrderForm;
