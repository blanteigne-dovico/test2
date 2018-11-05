import { observable, action } from "mobx";

export class StoresManager {
  constructor() {
    this._stores = observable.map({}, { deep: true });
  }

  @action
  get(ClassName) {
    let store = this._stores.get(ClassName);

    if (!store) {
      store = new ClassName();
      this._stores.set(ClassName, store);
    }

    return store;
  }
}

export default new StoresManager();
