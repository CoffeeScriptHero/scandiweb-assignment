import React, { Component } from "react";
import { connect } from "react-redux";
import CartProduct from "../../components/СartProduct/CartProduct";
import { setCategory } from "../../store/reducers/category.slice";
import {
  changeQuantity,
  sendOrderData,
  productRemove,
} from "../../store/reducers/cart.slice";
import Loader from "../../components/Loader/Loader";
import "./cart.scss";
import { countTotalPrice, fetchProducts } from "../../services/cart-helpers";
import cartSvg from "../../assets/images/cart-dummy.svg";
import { Link } from "react-router-dom";

class Cart extends Component {
  state = {
    products: [],
    isLoading: true,
    orderDone: false,
  };

  makeOrder = () => {
    this.props.sendOrderData();
    this.setState({ orderDone: true, products: [] });
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
    fetchProducts(this.props.cart, this.addProduct, this.setLoading);
    this.props.setCategory(null);
  }

  render() {
    const { products, isLoading, orderDone } = this.state;

    if (isLoading) return <Loader />;

    const { cart, currency, changeQuantity, productRemove } = this.props;

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
          product={product}
          currency={currency}
        />
      );
    });

    const totalPrice = countTotalPrice(products, currency, cart);
    const totalQuantity = cart.reduce((prev, cur) => prev + cur.quantity, 0);
    const taxNumber = 21;
    const tax = ((totalPrice / 100) * taxNumber).toFixed(2);

    return (
      <div className="cart">
        <h1 className="cart__title">Cart</h1>
        {!isLoading && !cart.length && !orderDone && (
          <div className="cart__empty">
            <img className="cart__empty-img" src={cartSvg} alt={"dummy cart"} />
            <h1 className="cart__empty-title">Cart is empty</h1>
            <span className="cart__empty-text">
              But it's never too late to change that :)
            </span>
          </div>
        )}
        {!isLoading && orderDone && (
          <div className="cart__order-done">
            <h1 className="cart__order-done-title">
              Thank you for your purchase!
            </h1>
            <span className="cart__order-done-text">
              The package will be sent to you soon..
            </span>
            <span className="cart__order-done-text-trolling">
              If you have specified the shipping details, of course ¯\_(ツ)_/¯
            </span>
            <Link className="purchase-button cart__order-done-button" to="/all">
              Continue shopping
            </Link>
          </div>
        )}
        {!isLoading && !!cart.length && (
          <div className="cart__main-content">
            <div className="cart__products">{productsList}</div>
            <div className="cart__order-info">
              <div className="cart__order-info-wrapper">
                <span className="cart__order-info-text">Tax 21%:</span>
                <span className="cart__order-info-text">Quantity:</span>
                <span className="cart__order-info-text"> Total:</span>
              </div>
              <div className="cart__order-info-wrapper">
                <span className="cart__order-info-value">
                  {currency}
                  {tax}
                </span>
                <span className="cart__order-info-value">{totalQuantity}</span>
                {/* tax can be separated from the total price */}
                <span className="cart__order-info-value">
                  {currency}
                  {totalPrice}
                </span>
              </div>
            </div>
            <button
              className="purchase-button cart__purchase-button"
              onClick={this.makeOrder}
            >
              Order
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { cart: state.cart, currency: state.currency.currency };
};

const mapDispatchToProps = {
  setCategory,
  productRemove,
  changeQuantity,
  sendOrderData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
