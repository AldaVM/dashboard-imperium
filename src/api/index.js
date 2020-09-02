import Axios from "axios";
import { imperiumBaseUrl } from "../environment";

let urls = {
    test: `http://localhost:8001`,
    development: imperiumBaseUrl,
    production: 'https://your-production-url.com/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;