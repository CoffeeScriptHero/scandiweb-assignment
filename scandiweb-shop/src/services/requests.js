import { client } from "../index";
import { GET_PRODUCT, GET_PRODUCTS } from "../queries/categories";

export const getProducts = async (title) => {
  const response = await client.query({
    query: GET_PRODUCTS,
    variables: {
      title: title,
    },
  });
  return response;
};

export const getProduct = async (id) => {
  const response = await client.query({
    query: GET_PRODUCT,
    variables: {
      id: id,
    },
  });
  return response;
};
