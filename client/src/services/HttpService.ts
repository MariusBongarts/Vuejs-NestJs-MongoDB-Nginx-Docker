import { AuthStore } from './../store/auth-store';
import axios, { AxiosBasicCredentials, AxiosRequestConfig } from 'axios';

/** Default config for axios instance */
const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
};

/** Creating the instance for axios */
const httpClient = axios.create(config);

/** Auth token interceptors */
const authInterceptor = (config: AxiosRequestConfig) => {
  /** TODO: Add auth token */
  config.headers.authorization = `Bearer ${AuthStore.state.jwt}`;
  return config;
};

/** logger interceptors */
const loggerInterceptor = (config: any) => {
  /** TODO */
  return config;
};

/** Adding the request interceptors */
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => {
    /** TODO: Add any response interceptors */
    return response;
  },
  error => {
    /** TODO: Do something with response error */
    return Promise.reject(error);
  }
);

export default httpClient;
