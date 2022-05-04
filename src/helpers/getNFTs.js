import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ADDRESSES } from "../constants/addresses";

export async function fetchNFTS(address, chainId) {
  if (ADDRESSES[chainId].KLIMATEES === undefined) {
    return;
  }
  const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/SLyMsDV9L2ZfKBGSA5Wu9skVJCRjioha"
  );
  const nfts = await web3.alchemy.getNfts({
    owner: address,
    contractAddresses: [ADDRESSES[chainId].KLIMATEES],
  });

  return nfts;
}
