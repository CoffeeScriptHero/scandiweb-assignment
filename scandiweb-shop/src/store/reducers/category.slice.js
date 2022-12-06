import { createSlice } from "@reduxjs/toolkit";
import { client } from "../../index";
import { GET_CATEGORIES_NAMES } from "../../queries/categories";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: null,
  },
  reducers: {
    categoriesAdd: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { categoriesAdd, productsAdd, setCategory } =
  categorySlice.actions;

export const fetchCategories = () => (dispatch) => {
  client.query({ query: GET_CATEGORIES_NAMES }).then((result) => {
    const categoriesNames = result.data.categories.map((c) => c.name);
    dispatch(categoriesAdd(categoriesNames));
  });
};

export default categorySlice.reducer;
