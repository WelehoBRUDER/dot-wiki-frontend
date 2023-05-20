import "../css/main.scss";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import User from "../modules/User";
import PublicProfile from "../components/PublicProfile";
import PrivateProfile from "../components/PrivateProfile";

import "../css/profile.scss";

export default function Profile() {
  const [name, setName] = useState(User.getName());
  const [profile, setProfile] = useState(null);
  const [date, setDate] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    axios("http://localhost:5000/user/" + username).then((result) => {
      setProfile(result.data.user);
    });
    setName(User.getName());
  }, [username]);

  useEffect(() => {
    try {
      const localDate = new Date(profile.date_registered);
      setDate(localDate.toLocaleDateString("fi-FI"));
    } catch {
      setDate("-");
    }
    setName(User.getName());
  }, [profile]);

  useEffect(() => {
    setName(User.getName());
  }, []);

  if (User.getId() === profile?.username) {
    return <PrivateProfile username={username} date={date} />;
  }

  if (profile) {
    return <PublicProfile profile={profile} date={date} />;
  }

  return <h1>Loading...</h1>;
}
