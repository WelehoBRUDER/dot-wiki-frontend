import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

// Style
import "./css/main.scss";
import "./css/components.scss";
import "./css/login_register.scss";
import "material-icons/iconfont/material-icons.css";

// Components / Pages
import Dashboard from "./routes/Dashboard";
import CreatePage from "./routes/NewPage";
import WikiPage from "./routes/WikiPage";
import PageDetails from "./routes/PageDetails";
import InteractiveMap from "./routes/InteractiveMap";
import SearchResults from "./routes/SearchResults";
import Header from "./components/Header";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Register from "./routes/Register";
import Profile from "./routes/Profile";
import NotFound from "./routes/404";

// Modules
import User from "./modules/User";

function App() {
  const [updateHeader, setUpdateHeader] = useState(false);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5000/authorize").then((result) => {
      User.setData(result.data.user);
      setUpdateHeader(!updateHeader);
    });
  }, []);

  return (
    <BrowserRouter>
      <Header update={updateHeader} />
      <div
        className="App"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
        }}
      >
        <Helmet>
          <title>Dungeons of Tavaraen Wiki</title>
        </Helmet>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new-page" element={<CreatePage />} />
          <Route path="/wiki/:id" element={<WikiPage />} />
          <Route path="/wiki/details/:id" element={<PageDetails />} />
          <Route path="/Interactive-map" element={<InteractiveMap />} />
          <Route path="/search/:id" element={<SearchResults />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/:username" element={<Profile />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
