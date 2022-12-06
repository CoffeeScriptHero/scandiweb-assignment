import React, { Component, createRef } from "react";
import "./minicart.scss";
import { connect } from "react-redux";
import { changeQuantity, productRemove } from "../../store/reducers/cart.slice";
import MinicartLoader from "../MinicartLoader/MinicartLoader";
import CartProduct from "../СartProduct/CartProduct";
import { Link } from "react-router-dom";
import { fetchProducts, countTotalPrice } from "../../services/cart-helpers";

class Minicart extends Component {
  state = {
    products: [],
    isLoading: true,
  };
  contentRef = createRef(null);

  closeHandler = (e) => {
    const modalContent = this.contentRef.current;
    if (!modalContent.contains(e.target) && e.target !== modalContent) {
      this.props.closeMinicart();
    }
  };

  addProduct = (product) => {
    this.setState(({ products }) => ({
      products: [...products, product],
    }));
  };

  setLoading = (isLoading) => this.setState({ isLoading });

  updateStateProducts = (id) => {
    // this function is optional, but it allows us to remove product in
    //  state.products if there is no products with such id in cart
    const sameIdProducts = this.props.cart.filter((p) => p.id === id);
    if (sameIdProducts.length === 1)
      this.setState((prevState) => ({
        products: prevState.products.filter((p) => p.id !== id),
      }));
  };

  componentDidMount() {
    if (this.props.cart.length) {
      fetchProducts(this.props.cart, this.addProduct, this.setLoading);
    } else {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { cart, currency, closeMinicart, changeQuantity, productRemove } =
      this.props;
    const { isLoading, products } = this.state;

    const totalPrice = countTotalPrice(products, currency, cart);

    const totalQuantity = cart.reduce((prev, cur) => prev + cur.quantity, 0);

    const productsList = cart.map((p, i) => {
      const product = products.find((item) => item.id === p.id);
      return (
        <CartProduct
          key={i}
          changeQuantity={changeQuantity}
          productRemove={productRemove}
          updateStateProducts={this.updateStateProducts}
          selectedAttrs={p.attributes}
          quantity={p.quantity}
          linkHandler={closeMinicart}
          inMinicart={true}
          product={product}
          currency={currency}
        />
      );
    });

    return (
      <div className="minicart" onClick={this.closeHandler}>
        <div
          className={`minicart__content ${
            !cart.length && !isLoading ? "minicart__content-centered" : ""
          }`}
          ref={this.contentRef}
        >
          {isLoading && <MinicartLoader />}
          {!cart.length && !isLoading && (
            <p className="minicart__content-empty-text">Cart is empty. Yet.</p>
          )}
          {!!cart.length && !isLoading && (
            <h2 className="minicart__content-title">
              My Bag,{" "}
              <span className="minicart__content-title-number">
                {totalQuantity} {totalQuantity > 1 ? "items" : "item"}
              </span>
            </h2>
          )}
          {!!cart.length && !isLoading && (
            <div className="minicart__content-items">{productsList}</div>
          )}
          {!!cart.length && !isLoading && (
            <div className="minicart__total">
              <span className="minicart__total-text">Total</span>
              <span className="minicart__total-price">
                {currency}
                {totalPrice}
              </span>
            </div>
          )}
          <div className="minicart__content-buttons">
            <Link
              to="/cart"
              onClick={closeMinicart}
              className="minicart__content-button minicart__content-button_dark"
            >
              VIEW BAG
            </Link>
            <button
              className="minicart__content-button minicart__content-button_green"
              onClick={closeMinicart}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currency: state.currency.currency,
  };
};

const mapDispatchToProps = {
  changeQuantity,
  productRemove,
};

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
