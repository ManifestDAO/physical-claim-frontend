import React from "react";
import "./index.css";
import { ReactComponent as RatioImage } from "../../components/Homepage/Images/ratio.svg";
import { ReactComponent as FlowerImage } from "../../components/Homepage/Images/flower.svg";
import { ReactComponent as CubeImage } from "../../components/Homepage/Images/cube.svg";

const Home = () => {
  return (
    <div className="wrap parent-flex">
      <div className="column parent-flex">
        <div className="img">
          <RatioImage />
        </div>
        <div className="copy-container">
          <div className="copy-container-content">
            <h3>GO MANIFEST IT</h3>
            <p>
              Manifest is creating its own luxury fashion brand to spread
              awareness and create clothing for the nouveau crypto rich, high
              quality, fashionable, luxury clothing for the modern human,
              tactical wear, casual wear, dresswear, and absolute drip.
            </p>
          </div>
        </div>
      </div>
      <div className="column parent-flex">
        <div className="img">
          <FlowerImage />
        </div>

        <div className="copy-container">
          <div className="copy-container-content">
            <h3>CREATE THE FUTURE</h3>
            <p>
              Manifest is creating its own luxury fashion brand to spread
              awareness and create clothing for the nouveau crypto rich, high
              quality, fashionable, luxury clothing for the modern human,
              tactical wear, casual wear, dresswear, and absolute drip.
            </p>
          </div>
        </div>
      </div>
      <div className="column parent-flex">
        <div className="img">
          <CubeImage />
        </div>

        <div className="copy-container">
          <div className="copy-container-content">
            <h3>OWN EVERYTHING, EVERYWHERE</h3>
            <p>
              The future of e-commerce is using NFTs to redeem/represent
              physical products, we help you do that using our open-internet
              service that uses shopify on the backend to build the store that
              allows you to create your own physical claim frontend. Any chain,
              anywhere, any how.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
