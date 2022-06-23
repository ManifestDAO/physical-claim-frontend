import React, { useState } from "react";
import "./index2.css";
import "./svgStyles.css";
import { ReactComponent as RatioImage } from "../../components/Homepage/Images/ratio.svg";
import { ReactComponent as FlowerImage } from "../../components/Homepage/Images/flower.svg";
import { ReactComponent as CubeImage } from "../../components/Homepage/Images/cube.svg";
import { ReactComponent as StoreButton } from "../../components/Homepage/Images/storeButton.svg";
import { ReactComponent as FormButton } from "../../components/Homepage/Images/formButton.svg";
import { ReactComponent as GithubButton } from "../../components/Homepage/Images/githubButton.svg";

const Home = () => {
  const [isManifestShown, setIsManifestShown] = useState(false);
  const [isCreateShown, setIsCreateShown] = useState(false);
  const [isOwnShown, setIsOwnShown] = useState(false);

  return (
    <div className="container">
      <div className="column-wrapper">
        <div className="column">
          <div className="icon">
            <div className="img">
              <RatioImage />
            </div>
          </div>
          <div className="icon-description">
            <h3>GO MANIFEST IT</h3>
            <p>
              Manifest delivers end to end physically claimable NFT
              manufacturing and development services. We're flexible to your
              needs whether your a crypto community that needs artistic
              expression in the real world or a streetwear company looking to
              break into web3.
            </p>
          </div>
        </div>
        <div className="call-to-action-section">
          <div className="icon-sec">
            <span className="call-to-action-name">MAAS</span>
          </div>
          <div className="icon-sec">
            <div className="actionButton">
              <FormButton></FormButton>
            </div>
          </div>
        </div>
      </div>

      <div className="column-wrapper">
        <div className="column">
          <div className="icon">
            <div className="img">
              <FlowerImage />
            </div>
          </div>
          <div className="icon-description">
            <h3>CREATE THE FUTURE</h3>
            <p>
              Digital copies of real world luxury items that are redeemable for
              the physical equivalent. Instant markets using automated market
              makers (AMMs) for physical goods. (Market coming soon) Luxury IRL
              and Internet crypto-born brand in Storefront. Redeem physical
              items using Inventory. We build for the next generation of Humans.
              Are you ready, traveler?
            </p>
          </div>
        </div>
        <div className="call-to-action-section">
          <div className="icon-sec">
            <span className="call-to-action-name">MANIFEST</span>
          </div>
          <div className="icon-sec">
            <div className="actionButton">
              <StoreButton></StoreButton>
            </div>
          </div>
        </div>
      </div>

      <div className="column-wrapper">
        <div className="column">
          <div className="icon">
            <div className="img">
              <CubeImage />
            </div>
          </div>
          <div className="icon-description">
            <h3>OWN EVERYTHING, EVERYWHERE</h3>
            <p>
              Manifest builds tech & developer tools to allow users to create
              their own physically claimable NFT shopfronts, cross-chain NFT
              solutions, and expanding the use-cases for NFTs in the real world
              and digital crypto world. We’re building right now (Check back
              later)
            </p>
          </div>
        </div>
        <div className="call-to-action-section">
          <div className="icon-sec">
            <span className="call-to-action-name">MANIFEST</span>
          </div>
          <div className="icon-sec">
            <div className="actionButton">
              <GithubButton></GithubButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
