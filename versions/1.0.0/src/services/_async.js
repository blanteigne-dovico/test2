export default class AsyncFetcher {
  fetch(url, method, data) {
    return window
      .fetch(url, {
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(data),
        method: method, // *GET, PUT, DELETE, etc.
        mode: "cors", // no-cors, *same-origin
        redirect: "follow", // *manual, error
        referrer: "no-referrer" // *client
      })
      .then(response => response.json()); // parses response to JSON
  }
}
