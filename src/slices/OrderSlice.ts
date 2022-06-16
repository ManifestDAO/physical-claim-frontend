import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: "",
  nft_address: "",
  nft_tokenid: "",
  size: "xs",
  email: "",
  first_name: "",
  last_name: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  country_code: "",
  province: "",
  province_code: "",
};

// TODO(Dala): the keys for the update_info case should be constants, then use those constants in the form. There should not be duplicate
//  string in different areas of the app, any change here or at the form can break it and be difficult to troubleshoot.

// TODO(Dala): the case strings are generally constants and all upper calse.

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
              [payload.key[2]]: payload.value[2],
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
