import { createSlice } from "@reduxjs/toolkit";
import { deepEqual } from "../../services/helpers";

const localCart = JSON.parse(localStorage.getItem("cart"));

export const cartSlice = createSlice({
  name: "cart",
  initialState: localCart || [],
  reducers: {
    productSave: (state, action) => {
      const newCart = [...state, action.payload];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return [...newCart];
    },
    productRemove: (state, action) => {
      const newCart = state.filter(
        (p) =>
          p.id !== action.payload.id ||
          !deepEqual(p.attributes, action.payload.attributes)
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return [...newCart];
    },
    removeById: (state, action) => {
      const newCart = state.filter((p) => p.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return [...newCart];
    },
    changeQuantity: (state, action) => {
      const { id, attributes, type } = action.payload;
      const newCart = state.map((p) => {
        if (p.id === id && deepEqual(p.attributes, attributes)) {
          const value = type === "increment" ? 1 : -1;
          p.quantity += value;
        }
        return p;
      });
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    clearCart: (state, action) => {
      localStorage.setItem("cart", "[]");
      return [];
    },
  },
});

export const {
  productSave,
  productRemove,
  removeById,
  changeQuantity,
  clearCart,
} = cartSlice.actions;

export const sendOrderData = () => (dispatch) => {
  // .... *code that sends all products from cart to database*
  dispatch(clearCart());
};

export default cartSlice.reducer;
