import { getProduct } from "./requests";

export const fetchProducts = async (cart, addProduct, setLoading) => {
  const uniqueCart = [
    ...cart
      .reduce((a, c) => {
        a.set(c.id, c);
        return a;
      }, new Map())
      .values(),
  ];
  for (let i = 0; i < uniqueCart.length; i++) {
    const product = (await getProduct(uniqueCart[i].id)).data.product;
    addProduct(product);
  }
  setLoading(false);
};

export const countTotalPrice = (products, currency, cart) => {
  if (!products.length || !cart.length) return null;
  return cart.reduce((prev, cur) => {
    const product = products.find((p) => p.id === cur.id);
    if (!product) return parseFloat(prev).toFixed(2);
    const itemPrice =
      product.prices.find((p) => p.currency.symbol === currency).amount *
      cur.quantity;
    return (parseFloat(prev) + itemPrice).toFixed(2);
  }, 0);
};

export const countItemPrice = (prices, currency, quantity) => {
  return (
    prices.filter((p) => p.currency.symbol === currency)[0].amount * quantity
  ).toFixed(2);
};
