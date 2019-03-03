import axios from 'axios';
import Env from './env';

export const GET = 'get';
export const POST = 'post';
export const PUT = 'put';
export const PATCH = 'patch';
export const DELETE = 'remove';

console.log(Env)

function onRequestSuccess(config) {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  return config;
}

function onRequestError(error) {
  console.error('RESPONSE error -', error.response);
  throw error.response;
}

class Api {
  constructor() {
    this.agent = axios.create({ baseURL: Env.CurrentAPI });

    this.agent.interceptors.request.use(
      onRequestSuccess,
      onRequestError,
    );
  }

  [GET](url, config) {
    return this.agent.get(url, config);
  }

  [DELETE](url, config) {
    return this.agent.delete(url, config);
  }

  [POST](url, payload, config) {
    return this.agent.post(url, payload, config);
  }

  [PUT](url, payload, config) {
    return this.agent.put(url, payload, config);
  }

  [PATCH](url, payload, config) {
    return this.agent.patch(url, payload, config);
  }
}

const API = new Api();


export default API;
