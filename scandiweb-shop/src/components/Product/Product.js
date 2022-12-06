import React, { Component } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import "./product.scss";
import { getProduct } from "../../services/requests";

class Product extends Component {
  state = {
    defaultAttrs: {},
  };

  cartBtnHandler = () => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const inCart = localCart.find((p) => p.id === this.props.id);

    if (inCart) {
      this.props.changeQuantity({
        id: this.props.id,
        attributes: this.state.defaultAttrs,
        type: "increment",
      });
    } else {
      this.props.productSave({
        id: this.props.id,
        attributes: this.state.defaultAttrs,
        quantity: 1,
      });
    }
  };

  componentDidMount() {
    getProduct(this.props.id).then((res) => {
      const attrs = res.data.product.attributes;

      attrs.forEach((a) => {
        this.setState((prevState) => ({
          defaultAttrs: {
            ...prevState.defaultAttrs,
            [a.name]: a.items[0].value,
          },
        }));
      });
    });
  }

  render() {
    const { id, name, brand, inStock, gallery, prices, currency } = this.props;

    const price = prices.filter((p) => p.currency.symbol === currency)[0]
      .amount;

    return (
      <article className="product">
        <div
          className={`product__img-wrapper ${
            inStock ? "" : "img-out-of-stock-text"
          }`}
        >
          <Link to={`/p/${id}`}>
            <img
              className={`product__img ${inStock ? "" : "img--opacity-grey"}`}
              src={gallery[0]}
              alt={name}
            />
          </Link>
          {inStock && (
            <div
              className="product__img-purchase-btn"
              onClick={this.cartBtnHandler}
            >
              <Icon type="cart" fill="white" width="24px" height="24px" />
            </div>
          )}
        </div>
        <Link
          to={`/p/${id}`}
          className={`product__name-link ${inStock ? "" : "text--color-grey"}`}
        >
          {brand} {name}
        </Link>
        <span className={`product__price ${inStock ? "" : "text--color-grey"}`}>
          {currency} {price}
        </span>
      </article>
    );
  }
}

export default Product;
