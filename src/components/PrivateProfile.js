import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import Input from "../reusable_components/Input";
import User from "../modules/User";
import Entries from "./Entries";

export default function PrivateProfile({ username, date }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const [userPages, setUserPages] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // add url search params to query
    const search = `?method=user&searchTerm=${username}`;

    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5000/search-pages/" + search).then((result) => {
      setUserPages(result.data);
    });
    axios.get("http://localhost:5000/search-comments/" + search).then((result) => {
      setUserComments(result.data);
    });
    profileAge();
  }, [date]);

  function profileAge(textOnly = true) {
    const today = new Date();
    const birthDate = new Date(User.getDateRegistered());
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (textOnly) {
      return `${age} years, ${m} months`;
    }
    return { age, m };
  }

  useEffect(() => {
    setName(User.getName());
  }, [username]);

  function changeUsername() {
    axios
      .put("http://localhost:5000/edit-user/" + username, {
        display_name: name,
      })
      .then(() => {
        window.location.reload();
      });
  }

  function uploadProfilePicture() {
    inputRef.current.click();
  }

  function finishUpload() {
    const file = inputRef.current.files[0];
    const url = URL.createObjectURL(file);
    const canvas = document.createElement("canvas");
    canvas.width = "96";
    canvas.height = "96";
    if (file.type.match("image.*")) {
      // create base64 blob from url
      const ctx = canvas.getContext("2d");
      const img = new Image(96, 96);
      img.src = url;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/png");
        if (data) {
          // upload to server as string
          axios
            .put("http://localhost:5000/edit-user/" + username, {
              profile_picture: data,
            })
            .then(() => {
              window.location.reload();
            });
        }
      };
    }
  }

  return (
    <div className="content">
      <Helmet>
        <title>Your profile - Dungeons of Tavaraen Wiki </title>
      </Helmet>
      <div className="profile">
        <div className="profile-header">
          <h1>{User.getName()}</h1>
          <div className="profile-avatar avatar" onClick={uploadProfilePicture}>
            <img className="avatar" src={User.getAvatar()} alt="avatar" />
            <p>Change avatar</p>
          </div>
          <p>
            Joined: {date} ({profileAge()})
          </p>
        </div>
        <input type="file" ref={inputRef} style={{ display: "none" }} onChange={finishUpload} />
        <div className="profile-display-name">
          <Input type="text" id="display-name" name="dn" label="Display name" value={name} onChange={(e) => setName(e.target.value)} />
          <button
            type="button"
            onClick={changeUsername}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
            }}
          >
            Save
          </button>
        </div>
        {Object.entries(User.getData({ dateString: "fi-FI" })).map(([key, value]) => {
          if (!value || key === "profile_picture") return;
          return (
            <div key={key}>
              <p>
                {key}: {value}
              </p>
            </div>
          );
        })}
        <p>Pages created: {userPages.length}</p>
        <p>Comments posted: {userComments.length}</p>
        {userPages.length > 0 && (
          <div className="page-entries">
            <h2>Pages created by {username}</h2>
            <Entries entries={userPages} showSettings={true} />
          </div>
        )}
      </div>
    </div>
  );
}
