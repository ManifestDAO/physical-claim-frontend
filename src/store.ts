import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/AccountSlice";
import NFTReducer from "./slices/NFTSlice";
import OrderInfoReducer from "./slices/OrderInfoSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    nfts: NFTReducer,
    order: OrderInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
