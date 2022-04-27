import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/AccountSlice";
import NFTReducer from "./slices/NFTSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    nfts: NFTReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
