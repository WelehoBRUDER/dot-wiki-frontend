import React, { useEffect } from "react";
import "../css/main.scss";
import LoginComponent from "../components/LoginComponent";
import { useNavigate } from "react-router-dom";
import User from "../modules/User";

export default function Login() {
  const navigate = new useNavigate();

  useEffect(() => {
    // if user is logged in, redirect to dashboard
    if (User.isAuthorized()) {
      navigate("/");
    }
  }, [User]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <div className="content">
        <div className="login">
          <LoginComponent />
        </div>
      </div>
    </div>
  );
}
