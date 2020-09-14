import Axios from "axios";
import { imperiumBaseUrl } from "../environment";

let urls = {
  test: imperiumBaseUrl,
  development: imperiumBaseUrl,
  production: imperiumBaseUrl,
};
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    mode: "cors",
  },
});

export default api;
