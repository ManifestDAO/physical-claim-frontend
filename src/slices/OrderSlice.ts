import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nft_address: "",
  nft_tokenid: "",
  size: "xs",
  email: "",
  first_name: "",
  last_name: "",
  address1: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  country_code: "",
  province: "",
  province_code: "",
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    update(state, { payload }) {
      try {
        switch (payload.type) {
          case "update_info":
            return {
              ...state,
              [payload.key]: payload.value,
            };
          case "update_region":
            return {
              ...state,
              province_code: payload.key,
            };
          case "update_nft":
            return {
              ...state,
              [payload.key[0]]: payload.value[0],
              [payload.key[1]]: payload.value[1],
            };
          case "update_size":
            return {
              ...state,
              [payload.key]: payload.value,
            };
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
  extraReducers: {},
});

export default OrderSlice.reducer;
export const update = OrderSlice.actions.update;
