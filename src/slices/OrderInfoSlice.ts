import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company: string;
  country: string;
  country_code: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  province: string;
  province_code: string;
}

const initialState: OrderState = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  country_code: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  province: "",
  province_code: "",
};

const OrderInfoSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    changeCountry(state, action) {
      state.country = action.payload;
      console.log(state.country);
    },
    changeRegion(state, action) {
      if (state.country === "United States") {
        state.state = action.payload;
        state.province = "";
        return;
      }
      state.province = action.payload;
      state.state = "";
    },
    changeInfo(state, { payload }) {
      const id = payload[0];
      if (id === "first_name") {
        state.first_name = payload[1];
        return;
      }
      if (id === "last_name") {
        state.last_name = payload[1];
        return;
      }
      if (id === "email") {
        state.email = payload[1];
        return;
      }
      if (id === "phone") {
        state.phone = payload[1];
        return;
      }
      if (id === "company") {
        state.company = payload[1];
        return;
      }
      if (id === "address1") {
        state.address1 = payload[1];
        return;
      }
      if (id === "address2") {
        state.address2 = payload[1];
        return;
      }
      if (id === "city") {
        state.city = payload[1];
        return;
      }
      if (id === "zip") {
        state.zip = payload[1];
        return;
      }
    },
  },
  extraReducers: {},
});

export default OrderInfoSlice.reducer;
export const changeCountry = OrderInfoSlice.actions.changeCountry;
export const changeRegion = OrderInfoSlice.actions.changeRegion;
export const changeInfo = OrderInfoSlice.actions.changeInfo;
