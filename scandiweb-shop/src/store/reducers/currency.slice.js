import { createSlice } from "@reduxjs/toolkit";
import { GET_ALL_CURRENCIES } from "../../queries/currencies";
import { client } from "../../index";

export const currencySlice = createSlice({
  name: "currency",
  initialState: {
    currencies: [],
    currency: localStorage.getItem("currency") || "$",
  },
  reducers: {
    currenciesAdd: (state, action) => {
      state.currencies = action.payload;
    },
    changeCurrency: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { currenciesAdd, changeCurrency } = currencySlice.actions;

export const fetchCurrencies = () => (dispatch) => {
  client.query({ query: GET_ALL_CURRENCIES }).then((result) => {
    dispatch(currenciesAdd(result.data.currencies));
  });
};

export default currencySlice.reducer;
