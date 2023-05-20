import "../css/main.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import Entries from "../components/Entries";
/* Add a dot (.) before your query to search for tags */

export default function SearchResults({ user }) {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const result = [];
    setEntries([]);
    /* Search with tag */
    if (id.startsWith(".")) {
      axios(`http://localhost:5000/tag-query/${id.replace(".", "")}`)
        .then((res) => {
          if (res.data) {
            res.data.forEach((qr) => {
              result.push(qr);
            });
          }
        })
        .then(() => {
          setEntries(result);
        });
    } else {
      /* No tag search, look for title */
      axios({
        method: "get",
        url: `http://localhost:5000/title-query/${id}`,
      })
        .then((res) => {
          if (res.data) {
            res.data.forEach((qr) => {
              result.push(qr);
            });
          }
        })
        .then(() => {
          setEntries(result);
        });
    }
  }, [id]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <Helmet>
        <title>Results for "{id}" - Dungeons of Tavaraen Wiki</title>
      </Helmet>
      <div className="content">
        <Entries entries={entries} />
        {entries.length === 0 ? <p>No page or tag relating to '{id}' was found...</p> : ""}
      </div>
    </div>
  );
}
