import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNFTS } from "../helpers/getNFTs";

interface NFTThunk {
  address: string;
}

export const getNFTInfo: any = createAsyncThunk(
  "nfts/getNFTInfo",
  async ({ address }: NFTThunk) => {
    const nftList = await fetchNFTS(address);
    return nftList;
  }
);

interface NFTState {
  status: string;
  nfts: any;
}

const initialState: NFTState = {
  status: "",
  nfts: [],
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
      state.nfts = payload.ownedNfts;
    },
    [getNFTInfo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default NFTSlice.reducer;
