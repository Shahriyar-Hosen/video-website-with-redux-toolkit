import axios from "axios";
// https://salmanapis.herokuapp.com/
// http://localhost:9000/
const axiosInstance = axios.create({
  baseURL: "https://salmanapis.herokuapp.com/",
});

export default axiosInstance;
