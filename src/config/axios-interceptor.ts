import axios from 'axios';

const ACCESS_TOKEN = 'jwt-access-token';
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
// axios.defaults.baseURL = process.env.SERVER_API_URL;
axios.defaults.baseURL = 'https://staging.ptemagic.com/api';

const setupAxiosInterceptors = (onUnauthenticated: any) => {
  const onRequestSuccess = (config: any) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = (response: any) => response;
  const onResponseError = (err: any) => {
    if (err) {
      let status = null;
      if (err.status) {
        status = err.status || err.response.status;
      } else if (err.response != null) {
        status = err.response.status;
      }

      if (status === 403 || status === 401) {
        localStorage.removeItem(ACCESS_TOKEN);
        onUnauthenticated();
      }
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
