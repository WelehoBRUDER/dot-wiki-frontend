import "../css/main.scss";
import RegisterComponent from "../components/RegisterComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import User from "../modules/User";

export default function Register() {
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
        <div className="register">
          <RegisterComponent />
        </div>
      </div>
    </div>
  );
}
