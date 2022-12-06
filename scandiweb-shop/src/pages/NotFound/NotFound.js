import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./not-found.scss";

class NotFound extends Component {
  render() {
    return (
      <div className="not-found">
        <h1 className="not-found__title">Sorry, this page is not available.</h1>
        <span className="not-found__text">
          The link you followed may be broken or the page may not exist.{" "}
          <Link className="not-found__link" to="/">
            Back to Main page.
          </Link>
        </span>
      </div>
    );
  }
}

export default NotFound;
