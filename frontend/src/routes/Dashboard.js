import Entries from "../components/Entries";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/main.scss";

export default function Dashboard({ user }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios("http://localhost:5000/").then((result) => {
      setEntries([...result.data]);
    });
  }, []);
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <div className="content">
        <Entries entries={entries} />
      </div>
    </div>
  );
}
