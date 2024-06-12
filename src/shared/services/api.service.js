import axios from 'axios'
import Cookies from "js-cookie"

class ApiFacade {

  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_URL
    });
    // Initialize the token
    this.token = Cookies.get('skillometer_access_token');
    // Bind the instance method to ensure proper context
    this._parseError = this._parseError.bind(this);
    // Add a request interceptor
    this.client.interceptors.request.use(
      config => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );
  }

  _parseError(err) {
    // TODO(i.zhuravlev): prepare response and check structure
    if (err.response.status < 500) {
      // return {
      //     code: err.response.status,
      //     message: err.response.data.detail,
      // }
      return Promise.reject(err)
    }
    return Promise.reject(err);
  }

  get(url, data, headers) {
    return this.client
      .get(url, { params: data, headers })
      .then(res => Promise.resolve(res.data))
      .catch(this._parseError);
  }

  post(url, data, headers) {
    return this.client
      .post(url, data, headers)
      .then(res => Promise.resolve(res.data))
      .catch(this._parseError);
  }

  put(url, data, headers) {
    return this.client
      .put(url, data, headers)
      .then(res => Promise.resolve(res.data))
      .catch(this._parseError);
  }

  patch(url, data, headers) {
    return this.client
      .patch(url, {params: data}, headers)
      .then(res => Promise.resolve(res.data))
      .catch(this._parseError);
  }

  delete(url, data, headers) {
    return this.client
      .delete(url, data, headers)
      .then(res => Promise.resolve(res.data))
      .catch(this._parseError);
  }
}

const apiService = new ApiFacade(import.meta.env.VITE_API_URL);

export default apiService;
