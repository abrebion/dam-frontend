import axios from "axios";

class apiHandler {
  constructor(url) {
    this.api = axios.create({
      baseURL: url || process.env.REACT_APP_BACKEND_URI,
      withCredentials: true
    });
  }

  get(endpoint) {
    return this.api.get(endpoint);
  }

  post(endpoint, payload) {
    return this.api.post(endpoint, payload);
  }

  patch(endpoint, payload) {
    return this.api.patch(endpoint, payload);
  }

  delete(endpoint) {
    return this.api.delete(endpoint);
  }

  search(endpoint) {
    return this.api.get(endpoint);
  }
}

export default new apiHandler();
