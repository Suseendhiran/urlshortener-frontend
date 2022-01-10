import axios from "axios";

export default axios.create({
  baseURL: "https://urly3.herokuapp.com/",
  responseType: "json",
  headers: { Authorization: localStorage.getItem("token") },
});
