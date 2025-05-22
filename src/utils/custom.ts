import axios from "axios";

const baseUrl = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
const requestHeaders = localStorage.getItem("authToken");


const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);





export { api };
export { requestHeaders };
export default baseUrl;
