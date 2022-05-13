import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/AccountSlice";
import NFTReducer from "./slices/NFTSlice";
import OrderReducer from "./slices/OrderSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    nfts: NFTReducer,
    order: OrderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
