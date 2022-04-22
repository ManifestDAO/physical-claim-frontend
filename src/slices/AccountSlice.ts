import { Web3Provider } from "@ethersproject/providers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AccountAsyncThunk {
  account: string;
}

export const getAccountInfo: any = createAsyncThunk(
  "account/getAccountInfo",
  async ({ account }: AccountAsyncThunk) => {
    const address = account;
    console.log("doing");
    return {
      address,
    };
  }
);

interface AccountState {
  address: string;
  nfts: string[];
  status: string;
}

const initialState: AccountState = {
  address: "",
  nfts: [],
  status: "",
};

const reducers = {};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers,
  extraReducers: {
    [getAccountInfo.pending]: (state, action) => {
      state.status = "loading";
    },
    [getAccountInfo.fulfilled]: (state, { payload }) => {
      state.status = "success";
      state.address = payload.address;
    },
    [getAccountInfo.rejected]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default accountSlice.reducer;
