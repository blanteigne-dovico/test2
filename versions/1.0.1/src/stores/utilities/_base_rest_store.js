import { observable, computed, action } from "mobx";

class BaseRestStore {
  @observable
  _state = {
    store: []
  };

  constructor(service, undoRedoStore) {
    this._service = service;
    this._undoRedo = undoRedoStore;
    this._preventAutoRun = false;
  }

  @computed
  get all() {
    return this._state.store;
  }

  @action
  reloadAsync() {
    return this._service.getAllAsync().then(results => {
      this._state.store = observable(results);
    });
  }

  @computed
  getByIdAsync(id) {
    const item = this.all().find(curId => id === curId);

    if (item) {
      return Promise.resolve(item);
    }

    return this._service.getByIdAsync(id).then(newItem => {
      this._state.store.push(item);
      return item;
    });
  }

  @action
  addAsync(item) {
    return this._service.addAsync(item).then(obj => {
      this._state.store.push(obj);
      return obj;
    });
  }

  @action
  updateAsync(item) {
    return this._service.updateAsync().then(() => {
      const newStore = this._state.store.map(curItem => {
        if (curItem.id === item.id) {
          return item;
        }

        return curItem;
      });
      this._state.store._replace(newStore);

      return item;
    });
  }

  @action
  deleteAsync(item) {
    return this._service.deleteAsync(item).then(() => {
      const newStore = this.filter(curItem => curItem.id !== item.id);
      this._state.store(newStore);
    });
  }
}

export default BaseRestStore;
