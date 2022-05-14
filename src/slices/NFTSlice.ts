import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { KlimaABI } from "../constants/ABIs/KlimaABI";
import { ADDRESSES } from "../constants/addresses";
import { fetchNFTS } from "../helpers/getNFTs";

interface NFTThunk {
  address: string;
  chainId: number;
  library: any;
}

export const getNFTInfo: any = createAsyncThunk(
  "nfts/getNFTInfo",
  async ({ address, chainId, library }: NFTThunk) => {
    const nftList = await fetchNFTS(address, chainId);
    return { nftList, chainId };
  }
);

interface NFTState {
  status: string;
  nfts: any;
}

const initialState: NFTState = {
  status: "",
  nfts: {
    klima: [],
    genesis: [],
  },
};
const reducers = {};

const NFTSlice = createSlice({
  name: "nfts",
  initialState,
  reducers,
  extraReducers: {
    [getNFTInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNFTInfo.fulfilled]: (state, { payload }) => {
      state.status = "success";
      for (let i = 0; i < payload.nftList.ownedNfts.length; i++) {
        if (
          payload.nftList.ownedNfts[i].contract.address ===
          ADDRESSES[payload.chainId].KLIMATEES
        ) {
          state.nfts.klima.push(payload.nftList.ownedNfts[i]);
        } else if (
          payload.nftList.ownedNfts[i].contract.address ===
          ADDRESSES[payload.chainId].GENESIS_HOODIES
        ) {
          state.nfts.genesis.push(payload.nftList.ownedNfts[i]);
        }
      }
    },
    [getNFTInfo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default NFTSlice.reducer;
