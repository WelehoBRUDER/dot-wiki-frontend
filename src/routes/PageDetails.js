import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import EditPage from "../components/EditPage";

import User from "../modules/User";

export default function PageDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const navigate = new useNavigate();

  useEffect(() => {
    if (!User.isAuthorized()) {
      return navigate("/login");
    }
    axios("http://localhost:5000/wiki/exact/" + id).then((result) => {
      setPage(result.data);
    });
  }, [id]);

  return (
    <div className="content">
      {page && (
        <EditPage
          exactID={page._id}
          id={page.id}
          Title={page.title}
          Tags={page.tags}
          MainText={page.text}
        />
      )}
    </div>
  );
}
