import React, { Component, createRef } from "react";
import "./select.scss";

class Select extends Component {
  state = { isOpen: false, value: localStorage.getItem("currency") || "$" };
  listRef = createRef();

  toggling = () => this.setState(({ isOpen }) => ({ isOpen: !isOpen }));

  select = (e) => {
    const value = e.target.dataset.value;
    this.setState({ value: value, isOpen: false });
    this.props.handleClick(value);
  };

  componentDidMount() {
    document.querySelector("html").addEventListener("click", (e) => {
      if (
        this.listRef.current &&
        e.target.className !== "select__btn" &&
        e.target.className !== "select__list-item"
      ) {
        // if select list opened (options shown) and there is click outside select
        this.setState({ isOpen: false });
      }
    });
  }

  render() {
    const { options } = this.props;
    // this option array consists of objects with 'value' and 'content' fields

    return (
      <div className="select">
        <button className="select__btn" onClick={this.toggling}>
          {this.state.value}{" "}
          <div
            className={`select__arrow ${
              this.state.isOpen ? "select__arrow-up" : "select__arrow-down"
            }`}
          ></div>
        </button>
        {this.state.isOpen && (
          <ul className="select__list" ref={this.listRef}>
            {options.map((o) => (
              <li
                key={o.value}
                className="select__list-item"
                data-value={o.value}
                onClick={this.select}
              >
                {o.content}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default Select;
