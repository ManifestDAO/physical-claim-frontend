import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ADDRESSES } from "../constants/addresses";

export async function fetchNFTS(address, chainId) {
  try {
    if (ADDRESSES[chainId].KLIMATEES === undefined) {
      return;
    }
    const web3 = createAlchemyWeb3(
      "https://eth-mainnet.alchemyapi.io/v2/0DaxEeV9p7V3kFyDzn90b-2-KpKp_-zO"
    );
    const nfts = await web3.alchemy.getNfts({
      owner: address,
      contractAddresses: [
        ADDRESSES[chainId].KLIMATEES,
        ADDRESSES[chainId].GENESIS_HOODIES,
      ],
    });

    return nfts;
  } catch (err) {
    console.log(err);
  }
}
