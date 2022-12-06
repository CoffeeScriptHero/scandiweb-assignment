import React, { Component } from "react";
import "./loader.scss";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <div className="loader__grid">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
