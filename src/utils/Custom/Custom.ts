import axios from "axios";

const baseUrl = axios.create({
  baseURL: `https://upskilling-egypt.com:3000`,
});
const requestHeaders = `${localStorage.getItem("authToken")}`;

export { requestHeaders };
export default baseUrl;
