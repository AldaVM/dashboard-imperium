import Axios from "axios";
import { imperiumBaseUrl, impierumTestURL } from "../environment";

let urls = {
  test: impierumTestURL,
  development: impierumTestURL,
  production: imperiumBaseUrl,
};
const api = Axios.create({
  // baseURL: urls[process.env.NODE_ENV],
  baseURL: impierumTestURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    mode: "cors",
  },
});

export default api;
