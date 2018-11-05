import React from "react";
import { observer } from "mobx-react";
import StoresManager from "../stores/stores_manager";
import PointlessRouterStore from "./pointless_router_store";
import { observable, computed, action } from "mobx";
export class PointlessRouterController {
  @observable _router;
  constructor(component, router = StoresManager.get(PointlessRouterStore)) {
    this._component = component;
    this._router = router;
  }

  @computed
  get route() {
    return this._router.route();
  }

  @action
  set(url) {
    this._router.url(url);
  }

  @computed
  get url() {
    return this._router.url;
  }
}

@observer
class PointlessRouter extends React.Component {
  _controller = new PointlessRouterController(undefined);

  render() {
    return <div>{this._controller.route}</div>;
  }
}

export default PointlessRouter;
