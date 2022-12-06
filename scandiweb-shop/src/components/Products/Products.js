import React, { Component } from "react";
import Product from "../Product/Product";
import "./products.scss";

class Products extends Component {
  render() {
    const { products, currency, productSave, removeById, changeQuantity } =
      this.props;

    const productsList = products.map((p) => (
      <Product
        key={p.id}
        id={p.id}
        name={p.name}
        brand={p.brand}
        inStock={p.inStock}
        gallery={p.gallery}
        prices={p.prices}
        currency={currency}
        attributes={p.attributes}
        productSave={productSave}
        changeQuantity={changeQuantity}
        removeById={removeById}
      />
    ));

    return <section className="products">{productsList}</section>;
  }
}

export default Products;
