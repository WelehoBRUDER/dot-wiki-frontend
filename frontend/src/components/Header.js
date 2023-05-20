import "../css/header.scss";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import logo from "../dungeons_logo.png";
import SearchBar from "./SearchBar";
import User from "../modules/User";
import { useState, useEffect } from "react";

export default function Header({ update }) {
  const { pathname } = useLocation();
  const [authorized, setAuthorized] = useState(false);
  function UserStuff() {
    if (!authorized) {
      return (
        <div>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={"/user/" + User.getId()}>{User.getId()}</Link>
          <Link to="/logout">Log out</Link>
        </div>
      );
    }
  }

  useEffect(() => {
    setAuthorized(User.isAuthorized());
  }, [pathname, update]);

  return (
    <header
      className={`main-header ${pathname}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_greyFade.png)`,
      }}
    >
      <Link to="/" className="logo">
        <img src={logo} alt="" />
      </Link>
      <div className="links">
        <a
          href="https://welehobruder.github.io/Dungeons-of-Tavaraen/"
          target="_blank"
          rel="noreferrer"
        >
          Play
        </a>
        <Link to="/new-page">Create Page</Link>
        <Link to="/interactive-map">World Map</Link>
        <UserStuff />
        <SearchBar />
      </div>
    </header>
  );
}
