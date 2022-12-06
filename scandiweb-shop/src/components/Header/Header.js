import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.scss";
import { withParams } from "../../services/routerHooks";
import logo from "../../assets/images/logo.png";
import Icon from "../Icon/Icon";
import { fetchCategories } from "../../store/reducers/category.slice";
import {
  fetchCurrencies,
  changeCurrency,
} from "../../store/reducers/currency.slice";
import Select from "../Select/Select";
import Minicart from "../Minicart/Minicart";

class Header extends Component {
  state = {
    showMinicart: false,
  };

  toggleMinicart = () => {
    this.setState(({ showMinicart }) => ({ showMinicart: !showMinicart }));
  };

  closeMinicart = () => this.setState({ showMinicart: false });

  handleClick = (e) => {
    if (e.target.tagName === "A") {
      this.closeMinicart();
      const activeClass = "header__content-category---active";
      const activeLink = document.querySelector(`.${activeClass}`);
      if (activeLink) activeLink.classList.remove(activeClass);
      e.target.classList.add(activeClass);
    }
  };

  optionHandler = (value) => {
    this.props.changeCurrency(value);
    localStorage.setItem("currency", value);
  };

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchCurrencies();
  }

  render() {
    const { category, categories, currencies, cart } = this.props;

    const totalQuantity = cart.reduce((prev, cur) => prev + cur.quantity, 0);

    const categoriesList = categories.map((c, i) => {
      return (
        <Link
          to={`/${c}`}
          key={i}
          className={`header__content-category ${
            c === category ? "header__content-category---active" : ""
          }`}
        >
          {c}
        </Link>
      );
    });

    const currenciesList = currencies.map((c) => ({
      value: c.symbol,
      content: `${c.symbol} ${c.label}`,
    }));

    return (
      <header className="header">
        <div className="header__content">
          <div
            className="header__content-categories"
            onClick={this.handleClick}
          >
            {!!categoriesList.length && categoriesList}
          </div>
          <div className="header__content-logo">
            <img
              className="header__content-logo-img"
              src={logo}
              alt="scandiweb shop logo"
            />
          </div>
          <div className="header__content-purchases">
            <Select
              options={!!currenciesList.length ? currenciesList : []}
              handleClick={this.optionHandler}
            />
            <div className="header__content-purchases-minicart-icon">
              <Icon type="cart" onClick={this.toggleMinicart} />
              {this.state.showMinicart && (
                <Minicart cart={cart} closeMinicart={this.closeMinicart} />
              )}
              {!!totalQuantity && (
                <div className="header__content-purchases-minicart-quantity">
                  {totalQuantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currencies: state.currency.currencies,
    categories: state.category.categories,
    category: state.category.category,
    cart: state.cart,
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCurrencies,
  changeCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Header));
