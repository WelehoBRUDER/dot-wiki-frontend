import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import User from "../modules/User";

export default function Comment({
  comment,
  setCommentChanged,
  commentChanged,
}) {
  const [poster, setPoster] = useState({});
  const [commentText, setCommentText] = useState(comment.text);
  const [editing, setEditing] = useState(false);
  const navigate = new useNavigate();

  useEffect(() => {
    axios("http://localhost:5000/user/" + comment.posted_by_user).then(
      (result) => {
        const user = result.data.user;
        setPoster(user);
      }
    );
  }, [comment]);

  function handleLikeComment(comment) {
    if (!User.isAuthorized()) {
      navigate("/login");
    }
    axios.defaults.withCredentials = true;
    if (comment.likes.includes(User.getId())) {
      axios
        .post("http://localhost:5000/remove-like-from-comment", {
          id: comment._id,
          username: User.getId(),
        })
        .then(() => {
          setCommentChanged(!commentChanged);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      axios
        .post("http://localhost:5000/like-comment", {
          id: comment._id,
          username: User.getId(),
        })
        .then(() => {
          setCommentChanged(!commentChanged);
        });
    }
  }

  function handleDislikeComment(comment) {
    if (!User.isAuthorized()) {
      navigate("/login");
    }
    if (comment.dislikes.includes(User.getId())) {
      axios
        .post("http://localhost:5000/remove-dislike-from-comment", {
          id: comment._id,
          username: User.getId(),
        })
        .then(() => {
          setCommentChanged(!commentChanged);
        });
    } else {
      axios
        .post("http://localhost:5000/dislike-comment", {
          id: comment._id,
          username: User.getId(),
        })
        .then(() => {
          setCommentChanged(!commentChanged);
        });
    }
  }

  // sends axios request to delete comment after confirmation
  function deleteComment() {
    if (!User.isAuthorized()) {
      navigate("/login");
    }
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    axios.defaults.withCredentials = true;
    axios
      .delete("http://localhost:5000/delete-comment", {
        id: comment._id,
        username: User.getId(),
      })
      .then(() => {
        setCommentChanged(!commentChanged);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // sends axios request to edit comment
  function editComment() {
    if (!User.isAuthorized()) {
      navigate("/login");
    }
    axios.defaults.withCredentials = true;
    axios
      .put("http://localhost:5000/edit-comment", {
        id: comment._id,
        text: commentText,
        username: User.getId(),
      })
      .then(() => {
        setEditing(false);
        setCommentChanged(!commentChanged);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="comment-item" key={comment.id}>
      <div className="comment-item-image">
        <Link to={"/user/" + comment.posted_by_user}>
          <img
            className="avatar"
            src={
              poster?.profile_picture ??
              "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="avatar"
          />
        </Link>
      </div>
      <div className="comment-item-header">
        <div className="comment-item-username">
          <Link to={"/user/" + comment.posted_by_user}>
            <strong>{poster?.display_name ?? poster?.username}</strong>
          </Link>
        </div>

        <div className="comment-item-date">
          {new Date(comment.date_posted).toLocaleString("en-GB")}
          {new Date(comment.date_posted).getTime() <
            new Date(comment.date_edited).getTime() && (
            <span>
              (edited: {new Date(comment.date_edited).toLocaleString("en-GB")})
            </span>
          )}
        </div>
        {User.isAuthorized() && User.getId() === comment.posted_by_user && (
          <div className="comment-poster-actions">
            <button title="Edit" onClick={() => setEditing(true)}>
              <i className="material-icons">edit</i>
            </button>
            <button title="Delete" onClick={deleteComment}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        )}
      </div>
      <div className="comment-item-content">
        {editing ? (
          <div className="editing-comment">
            <textarea
              className="comment-item-textarea"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              onClick={() => {
                setEditing(false);
                setCommentText(comment.text);
              }}
            >
              Cancel
            </button>
            <button onClick={editComment}>Save</button>
          </div>
        ) : (
          <p>{commentText}</p>
        )}
      </div>
      <div className="comment-item-likes">
        <div className="comment-item-likes-count">
          <button onClick={() => handleLikeComment(comment)}>
            <i
              className={`material-icons ${
                comment.likes.includes(User.getId()) ? "selected" : ""
              }`}
            >
              thumb_up
            </i>
          </button>{" "}
          <span>{comment.likes?.length ?? 0}</span>
        </div>
        <div className="comment-item-dislikes-count">
          <button onClick={() => handleDislikeComment(comment)}>
            <i
              className={`material-icons ${
                comment.dislikes.includes(User.getId()) ? "selected" : ""
              }`}
            >
              thumb_down
            </i>
          </button>{" "}
          <span>{comment.dislikes?.length ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
