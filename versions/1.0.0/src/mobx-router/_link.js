import React from "react";
import { PointlessRouterController } from "./pointless_router";

class Link extends React.Component {
  _controller = new PointlessRouterController(undefined);
  render() {
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this._controller.set(this.props.href);
        }}
      >
        {this.props.children}
      </a>
    );
  }
}

export default Link;
