import { useState, useEffect } from "react";
import { sort_comments } from "../modules/sort";
import axios from "axios";
import Comment from "./Comment";
import User from "../modules/User";

export default function CommentSection({ page }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentChanged, setCommentChanged] = useState(false);

  useEffect(() => {
    axios("http://localhost:5000/comments/" + page.id).then((result) => {
      setComments(sort_comments(result.data, "likes", "asc"));
    });
  }, [page, commentChanged]);

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return (
    <div className="comments">
      <div className="comment-creation">
        <textarea
          name="comment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
          }}
        />
        <button
          className="comment-submit menu-button"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
          }}
          onClick={() => {
            axios.defaults.withCredentials = true;
            axios
              .post("http://localhost:5000/create-comment", {
                posted_by_user: User.getId(),
                posted_to_page: page.id,
                response_to: "",
                date_posted: new Date(),
                date_edited: new Date(),
                text: comment,
              })
              .then((result) => {
                setComment("");
                setCommentChanged(!commentChanged);
              });
          }}
        >
          Post comment
        </button>
      </div>
      <div className="comment-list">
        {comments.map((comment) => (
          <Comment
            comment={comment}
            key={comment._id}
            commentChanged={commentChanged}
            setCommentChanged={setCommentChanged}
          />
        ))}
      </div>
    </div>
  );
}
