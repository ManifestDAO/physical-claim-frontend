import React, { useState } from "react";
import "./index.css";
import { ReactComponent as RatioImage } from "../../components/Homepage/Images/ratio.svg";
import { ReactComponent as FlowerImage } from "../../components/Homepage/Images/flower.svg";
import { ReactComponent as CubeImage } from "../../components/Homepage/Images/cube.svg";

const Home = () => {
  const [isManifestShown, setIsManifestShown] = useState(false);
  const [isCreateShown, setIsCreateShown] = useState(false);
  const [isOwnShown, setIsOwnShown] = useState(false);

  return (
    <div className="wrap parent-flex">
      <div
        className="manifest column parent-flex"
        onMouseEnter={() => setIsManifestShown(true)}
        onMouseLeave={() => setIsManifestShown(false)}
      >
        <div className="img">
          <RatioImage />
        </div>
        <div className="copy-container">
          <div className="copy-container-content">
            <h1>GO MANIFEST IT</h1>
            <p>
              Manifest is creating its own luxury fashion brand to spread
              awareness and create clothing for the nouveau crypto rich, high
              quality, fashionable, luxury clothing for the modern human,
              tactical wear, casual wear, dresswear, and absolute drip.
            </p>
          </div>
        </div>
        {isManifestShown && (
          <div className="call-to-action-container manifest">
            <span className="call-to-action-name">MAAS</span>
            <button type="button">FORM</button>
          </div>
        )}
      </div>
      <div
        className="create column parent-flex"
        onMouseEnter={() => setIsCreateShown(true)}
        onMouseLeave={() => setIsCreateShown(false)}
      >
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
        {isCreateShown && (
          <div className="call-to-action-container create">
            <span className="call-to-action-name">MANIFEST BRAND</span>
            <button>STORE</button>
          </div>
        )}
      </div>
      <div
        className="own column parent-flex"
        onMouseEnter={() => setIsOwnShown(true)}
        onMouseLeave={() => setIsOwnShown(false)}
      >
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
        {isOwnShown && (
          <div className="call-to-action-container own">
            <span className="call-to-action-name">DEVELOPERS</span>
            <button>GitHub</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
