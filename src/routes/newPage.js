import React, { useEffect, useState } from "react";
import "../css/main.scss";
import "../css/new_page.scss";
import User from "../modules/User";
import CreatePage from "../components/CreatePage";
import { useNavigate } from "react-router-dom";

function NewPage() {
  const navigate = new useNavigate();

  useEffect(() => {
    if (!User.isAuthorized()) {
      navigate("/login");
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <div className="content new-page">
        {User.isAuthorized() ? <CreatePage /> : <h1>Authenticating...</h1>}
      </div>
    </div>
  );
}

export default NewPage;
