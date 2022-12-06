import React, { Component } from "react";
import * as Icons from "../../assets/icons";
import "./icon.scss";

export default class Icon extends Component {
  render() {
    const {
      type,
      onClick,
      disabledClick = false,
      flippedX = false,
      ...rest
    } = this.props;
    const iconJsx = Icons[type];
    if (!iconJsx) return null;
    return (
      <span
        className={`icon ${disabledClick ? "icon__click-off" : ""} ${
          flippedX ? "icon__flipped--horizontally" : ""
        }`}
        onClick={onClick}
      >
        {iconJsx({ ...rest })}
      </span>
    );
  }
}
