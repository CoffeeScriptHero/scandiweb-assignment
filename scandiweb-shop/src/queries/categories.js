import { gql } from "@apollo/client";

export const GET_CATEGORIES_NAMES = gql`
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = gql`
  query ($title: String!) {
    category(input: { title: $title }) {
      products {
        id
        name
        brand
        inStock
        gallery
        description
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      brand
      inStock
      category
      gallery
      description
      attributes {
        name
        type
        items {
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
