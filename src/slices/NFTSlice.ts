import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ADDRESSES } from "../constants/addresses";
import { getNFTBalances } from "../helpers/getNFTBalances";
import { fetchNFTS } from "../helpers/getNFTs";

interface NFTThunk {
  address: string;
  chainId: number;
  library: any;
}

export const getNFTInfo: any = createAsyncThunk(
  "nfts/getNFTInfo",
  async ({ address, chainId, library }: NFTThunk) => {
    console.log(address);
    try {
      const nftList = await fetchNFTS(address, chainId);
      const balances = await getNFTBalances(address, library, chainId);

      return { nftList, chainId, balances };
    } catch (err) {
      console.log(err);
    }
  }
);

interface NFTState {
  status: string;
  newNfts: any;
  nfts: any;
  balances: {
    kliBal: any;
    genBal: any;
  };
}

const initialState: NFTState = {
  status: "",
  newNfts: [],
  nfts: {
    klima: [],
    genesis: [],
  },
  balances: {
    kliBal: {
      1: 0,
      2: 0,
      3: 0,
    },
    genBal: {
      1: 0,
      2: 0,
      3: 0,
    },
  },
};

const NFTSlice = createSlice({
  name: "nfts",
  initialState,
  reducers: {
    clear(state, action) {
      state.nfts = action.payload;
    },
  },
  extraReducers: {
    [getNFTInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [getNFTInfo.fulfilled]: (state, { payload }) => {
      try {
        state.status = "success";
        state.balances.kliBal = payload.balances.kliBal;
        state.balances.genBal = payload.balances.genBal;
        state.newNfts = payload.nftList.ownedNfts;
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
      } catch (err) {
        console.log(err);
      }
    },
    [getNFTInfo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default NFTSlice.reducer;
export const clear = NFTSlice.actions.clear;
