import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const URL = "https://pokeapi.co";

const API_BASE_URL = `${URL}/api/v2`;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

const setAuthorizationHeader = (config: AxiosRequestConfig) => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
};

export const axiosInterceptor = () => {
  axiosInstance.interceptors.request.use((req) => {
    // loader$.setSubject = true;
    setAuthorizationHeader(req);
    return req;
  });
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      const { response } = err;
      if (!response) {
        return Promise.reject(err);
      }
      if (response.data.error.name === "JsonWebTokenError") {
        localStorage.removeItem("token");
        return;
      }
      return Promise.reject(err);
    }
  );
};
