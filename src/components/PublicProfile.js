import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Entries from "./Entries";

export default function PublicProfile({ profile, date }) {
  const [userPages, setUserPages] = useState([]);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // add url search params to query
    const search = `?method=user&searchTerm=${profile.username}`;

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
    const birthDate = new Date(profile.date_registered);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (textOnly) {
      return `${age} years, ${m} months`;
    }
    return { age, m };
  }

  return (
    <div className="content">
      <Helmet>
        <title>User {profile.display_name ?? profile.username} - Dungeons of Tavaraen Wiki</title>
      </Helmet>
      <div className="profile">
        <div className="profile-header">
          <h1>{profile.display_name ?? profile.username}</h1>
          <img
            src={profile.profile_picture ?? "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
            alt="avatar"
            className="avatar"
          />
          <p>
            Joined: {date} ({profileAge()})
          </p>
        </div>
        <p>Pages created: {userPages.length}</p>
        <p>Comments posted: {userComments.length}</p>
        {userPages.length > 0 && (
          <div className="page-entries">
            <h2>Pages created by {profile.display_name ?? profile.username}</h2>
            <Entries entries={userPages} />
          </div>
        )}
      </div>
    </div>
  );
}
