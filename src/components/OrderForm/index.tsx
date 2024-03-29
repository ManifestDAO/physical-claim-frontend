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
import { API_DOMAIN } from "../../constants/general";

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
  const { library, chainId } = useWeb3React();
  const [isError, setIsError] = useState(false);
  const [orderState, setOrderState] = useState("");
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

  async function approve() {
    try {
      const provider = await library;
      const signer = await provider.getSigner();
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
      const provider = await library;
      const signer = await provider.getSigner();
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
      url: `${API_DOMAIN}/api/v1/order`,
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

    request(options, function (error: any, response: any) {
      try {
        if (
          response.body ===
          "<html>\r\n<head><title>502 Bad Gateway</title></head>\r\n<body>\r\n<center><h1>502 Bad Gateway</h1></center>\r\n</body>\r\n</html>\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n<!-- a padding to disable MSIE and Chrome friendly error page -->\r\n"
        ) {
          setApiReturn("failure");
          setResponse(
            `502 Bad Gateway. Please contact Manifest team on Discord`
          );
          return;
        }
        if (error) {
          setApiReturn("failure");
          setResponse(`An error occured: ${error}`);
          return;
        }
        const reply = JSON.parse(response.body);

        if (reply.id) {
          setApiReturn("success");
          setResponse(`Order ID: ${reply.id}`);
          return;
        }
        if (reply.message) {
          setApiReturn("failure");
          setResponse(reply.message);
          return;
        }
      } catch (err) {
        setApiReturn("failure");
        setResponse(err);
        return;
      }
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
          className={`order-input ${
            isError && order.first_name === "" && "error"
          } ${isError && order.first_name !== "" && "success"}`}
          id="first_name"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
        <input
          placeholder="Surname"
          className={`order-input ${
            isError && order.last_name === "" && "error"
          } ${isError && order.last_name !== "" && "success"}`}
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
          className={`order-input ${
            isError && order.address1 === "" && "error"
          } ${isError && order.address1 !== "" && "success"}`}
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
          id="country"
          value={order.country_code}
          valueType="short"
          priorityOptions={["CA", "US", "GB", "AU"]}
          onChange={(value: string, e: ChangeEvent<Element>) =>
            handleCountryChange(value, e)
          }
        />

        <RegionDropdown
          id="region"
          country={order.country_code}
          countryValueType="short"
          value={order.province_code}
          valueType="short"
          onChange={handleRegionChange}
        />

        <input
          placeholder="City"
          className={`order-input ${isError && order.city === "" && "error"} ${
            isError && order.city !== "" && "success"
          }`}
          id="city"
          type="text"
          onChange={(event) => changeHandler(event)}
        />

        <input
          placeholder="ZIP/Postal"
          className={`order-input ${isError && order.zip === "" && "error"} ${
            isError && order.zip !== "" && "success"
          }`}
          id="zip"
          type="text"
          onChange={(event) => changeHandler(event)}
        />
      </div>
      <div className="form-chunk">{formButton}</div>

      {isError && (
        <p className="order-error-text">
          You have not filled out all the required fields
        </p>
      )}
    </form>
  );
};

export default OrderForm;
