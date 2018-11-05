class BaseRestService {
  constructor(url, async) {
    this._url = url;
    this._async = async;

    this.getAllAsync = this.getAllAsync.bind(this);
  }

  myMethod = () => 10;

  getAllAsync() {
    return this._async.fetch(this._url, "GET");
  }

  getByIdAsync(id) {
    return this._async.fetch(this._url + id, "GET");
  }

  addAsync(item) {
    return this._async.fetch(this._url, "POST", item).then(response => {
      item.id = response.id;
      return item;
    });
  }

  updateAsync(item) {
    return this._async.fetch(this._url, "PUT", item);
  }

  deleteAsync(item) {
    return this._async.fetch(this._url + item.id, "DELETE");
  }
}

export default BaseRestService;
