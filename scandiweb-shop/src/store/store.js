import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./reducers/currency.slice";
import categoryReducer from "./reducers/category.slice";
import cartReducer from "./reducers/cart.slice";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    category: categoryReducer,
    cart: cartReducer,
  },
});
