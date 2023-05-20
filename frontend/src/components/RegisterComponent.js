import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../css/main.scss";
import "../css/auth.scss";
import User from "../modules/User";
import Input from "../reusable_components/Input";
import Button from "../reusable_components/Button";

export default function RegisterComponent() {
  const navigate = new useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password, email } = event.target;

    const data = {
      username: username.value,
      password: password.value,
      email: email.value,
    };
    try {
      axios.defaults.withCredentials = true;
      axios
        .post("http://localhost:5000/create-user", data)
        .then((result) => {
          if (result.data?.user) {
            User.setData(result.data.user);
            navigate("/");
          } else {
            console.log(result.data);
          }
        })
        .catch((error) => {
          const error_data = error.response.data;
          setUsernameError(error_data.username);
          setPasswordError(error_data.password);
          setEmailError(error_data.email);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register-window">
      <form
        method="POST"
        action="http://localhost:5000/create-user"
        onSubmit={(e) => handleSubmit(e)}
      >
        <p>Fields with (*) are required.</p>
        <Input
          type="text"
          id="username"
          name="username"
          label="(*) Username"
          error={usernameError}
          required
        />
        <Input
          type="email"
          id="email"
          name="email"
          label="Email"
          error={emailError}
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="(*) Password"
          error={passwordError}
          required
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
