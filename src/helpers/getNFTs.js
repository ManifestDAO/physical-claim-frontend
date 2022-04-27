import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { ADDRESSES } from "../constants/addresses";

export async function fetchNFTS(address) {
  const web3 = createAlchemyWeb3(
    "https://eth-rinkeby.alchemyapi.io/v2/SLyMsDV9L2ZfKBGSA5Wu9skVJCRjioha"
  );
  const nfts = await web3.alchemy.getNfts({
    owner: address,
    contractAddresses: [ADDRESSES.KLIMATEES],
  });

  return nfts;
}
