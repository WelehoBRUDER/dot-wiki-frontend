import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/main.scss";
import "../css/auth.scss";
import User from "../modules/User";
import Input from "../reusable_components/Input";
import Button from "../reusable_components/Button";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = new useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    try {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:5000/login-user", data)
        .then((result) => {
          if (result.data?.user) {
            User.setData(result.data.user);
            navigate("/");
          } else {
            console.log(result.data);
            setError(result.data);
          }
        })
        .catch((error) => {
          const error_data = error.response.data;
          console.log(error.response);
          setError(error_data);
        });
    } catch {}
  }

  return (
    <div className="login-window">
      <form
        method="POST"
        action="http://localhost:5000/login-user"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="error">{error}</div>
        <p>
          Not a user yet? <Link to="/register">Register here</Link>
        </p>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
