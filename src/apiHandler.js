import axios from "axios";

export default class apiHandler {
  constructor(url) {
    this.api = axios.create({
      baseURL: url || process.env.REACT_APP_BACKEND_URI
    });
  }

  get(endpoint) {
    return this.api.get(enpoint);
  }

  post(endpoint, data) {
    return this.api.post(enpoint, data);
  }

  patch(endpoint, data) {
    return this.api.patch(enpoint, data);
  }

  delete(endpoint) {
    return this.api.delete(enpoint);
  }

  search(endpoint) {
    return this.api.get(enpoint);
  }
}
