import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AccountAsyncThunk {
  account: string;
  library: any;
  chainId: number;
}

export const getAccountInfo: any = createAsyncThunk(
  "account/getAccountInfo",
  async ({ account }: AccountAsyncThunk) => {
    const address = account;
    return {
      address,
    };
  }
);

interface AccountState {
  address: string;
  nfts: string[];
  status: string;
  provider: string;
}

const initialState: AccountState = {
  address: "",
  nfts: [],
  status: "",
  provider: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    changeProvider(state, action) {
      state.provider = action.payload;
      localStorage.setItem("Provider", action.payload);
    },
  },
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
export const changeProvider = accountSlice.actions.changeProvider;
