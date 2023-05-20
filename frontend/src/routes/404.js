import React from "react";
import "../css/main.scss";

export default function NotFound() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <div className="content">
        <div className="error">
          <h1> 404 - Page Not Found </h1>
          <p>The page you're looking for doesn't exist right now.</p>
        </div>
      </div>
    </div>
  );
}
