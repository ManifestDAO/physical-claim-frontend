import { ethers } from "ethers";
import { GenesisABI } from "../constants/ABIs/GenesisABI";
import { KlimaABI } from "../constants/ABIs/KlimaABI";
import { ADDRESSES } from "../constants/addresses";

export async function getNFTBalances(address, library, chainId) {
  const provider = await library;
  const signer = await provider;
  const klimaContract = new ethers.Contract(
    ADDRESSES[chainId].KLIMATEES,
    KlimaABI[chainId],
    signer
  );
  const genesisContract = new ethers.Contract(
    ADDRESSES[chainId].GENESIS_HOODIES,
    GenesisABI[chainId],
    signer
  );

  try {
    const klimaBalances = async (address) => {
      const cooperation = await klimaContract.balanceOf(address, 1);
      const growth = await klimaContract.balanceOf(address, 2);
      const protection = await klimaContract.balanceOf(address, 3);

      return {
        1: parseInt(cooperation._hex),
        2: parseInt(growth._hex),
        3: parseInt(protection._hex),
      };
    };

    const genesisBalances = async (address) => {
      const creation = await genesisContract.balanceOf(address, 1);
      const abundance = await genesisContract.balanceOf(address, 2);
      const flow = await genesisContract.balanceOf(address, 3);

      return {
        1: parseInt(creation._hex),
        2: parseInt(abundance._hex),
        3: parseInt(flow._hex),
      };
    };

    const kliBal = await klimaBalances(address);
    const genBal = await genesisBalances(address);

    return {
      kliBal,
      genBal,
    };
  } catch (err) {
    console.log(err);
  }
}
