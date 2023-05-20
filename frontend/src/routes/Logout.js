import axios from "axios";
import { useNavigate } from "react-router";
import User from "../modules/User";
export default function logout() {
  const navigate = new useNavigate();
  axios.defaults.withCredentials = true;
  axios.get("http://localhost:5000/logout-user").then((result) => {
    User.setData(null);
    navigate("/");
  });
  return <></>;
}
