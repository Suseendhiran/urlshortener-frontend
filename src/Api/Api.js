import axios from "axios";
import { useAuth } from "../Providers/AuthProvider";

function Api() {
  const { token } = useAuth();
  return axios.create({
    baseURL: "https://urly3.herokuapp.com/",
    responseType: "json",
    headers: {
      Authorization: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : token,
    },
  });
}

export default Api;
