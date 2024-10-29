import axios from "axios";
//todo
axios.defaults.baseURL = "https://baseurl";
const http = {
  get: axios.get,
  post: axios.post,
  delete: axios.delete,
  put: axios.put,
};
export default http;
