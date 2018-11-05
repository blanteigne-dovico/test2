import config from "../config";
import { observable, action } from "mobx";
import routes from "./routes";
export default class PointlessRouterStore {
  @observable
  _state = {
    url: "",
    routes: ""
  };

  constructor() {
    this.url(window.location.toString().replace(config.baseUrl, ""));

    this._state.routes = routes;
  }

  @action
  url(url) {
    this._state.url = url;
  }

  route() {
    return this._state.routes[this._state.url];
  }
}
