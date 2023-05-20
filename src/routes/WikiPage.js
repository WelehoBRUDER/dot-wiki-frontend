import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "../css/main.scss";
import "../css/wiki_page.scss";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import PageContent from "../components/PageContent";
import CommentSection from "../components/CommentSection";

function WikiPage({ user }) {
  const { id } = useParams();
  const [pageTitle, setPageTitle] = useState(id);
  const [page, setPage] = useState({});
  const navigate = new useNavigate();

  useEffect(() => {
    axios("http://localhost:5000/wiki/" + id.replace(/-/g, " ")).then((result) => {
      let data = result.data[0];
      setPage({ ...data });
      setPageTitle(data.title);
      if (!data) {
        navigate("/404");
      }
    });
  }, []);

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/image/large_background_grey.png)`,
      }}
    >
      <Helmet>
        <title>{pageTitle} - Dungeons of Tavaraen Wiki</title>
      </Helmet>
      <div className="wiki-page-content">
        <PageContent page={page} />
        <CommentSection page={page} user={user} />
      </div>
    </div>
  );
}

export default WikiPage;
