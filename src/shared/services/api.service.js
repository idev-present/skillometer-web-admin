import axios from 'axios'

class ApiFacade {

  constructor(baseURL) {
    this.client = axios.create({
      baseURL: baseURL || 'http://192.168.1.116:8000/api/v1'
    });
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

const apiService = new ApiFacade();

export default apiService;
