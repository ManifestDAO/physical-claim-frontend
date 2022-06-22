import React, { useState } from "react";
import "./index.css";
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
    <div className="wrap parent-flex">
      <div
        className="manifest column parent-flex"
        onMouseEnter={() => setIsManifestShown(true)}
        onMouseLeave={() => setTimeout(() => setIsManifestShown(false), 500)}
      >
        <div className="img">
          <RatioImage />
        </div>
        <div className="copy-container">
          <div className="copy-container-content">
            <h1>GO MANIFEST IT</h1>
            <p>
              Manifest delivers end to end physically claimable NFT
              manufacturing and development services. We're flexible to your
              needs whether your a crypto community that needs artistic
              expression in the real world or a streetwear company looking to
              break into web3.
            </p>
          </div>
        </div>
        {isManifestShown && (
          <div className="call-to-action-container manifest">
            <span className="call-to-action-name">MAAS</span>
            <div className="actionButton">
              <FormButton></FormButton>
            </div>
          </div>
        )}
      </div>
      <div
        className="create column parent-flex"
        onMouseEnter={() => setIsCreateShown(true)}
        onMouseLeave={() => setTimeout(() => setIsCreateShown(false), 500)}
      >
        <div className="img">
          <FlowerImage />
        </div>
        <div className="copy-container">
          <div className="copy-container-content">
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
        {isCreateShown && (
          <div className="call-to-action-container create">
            <span className="call-to-action-name">MANIFEST</span>
            <div className="actionButton">
              <StoreButton></StoreButton>
            </div>
          </div>
        )}
      </div>
      <div
        className="own column parent-flex"
        onMouseEnter={() => setIsOwnShown(true)}
        onMouseLeave={() => setTimeout(() => setIsOwnShown(false), 500)}
      >
        <div className="img">
          <CubeImage />
        </div>
        <div className="copy-container">
          <div className="copy-container-content">
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
        {isOwnShown && (
          <div className="call-to-action-container own">
            <span className="call-to-action-name">DEVELOPERS</span>
            <div className="actionButton">
              <GithubButton></GithubButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
