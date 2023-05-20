import { Link } from "react-router-dom";
import User from "../modules/User";
import "../css/entries.scss";

export default function Entries({ entries, showSettings }) {
  function AdminButtons({ entry }) {
    if (User.canDeletePages()) {
      return (
        <form method="POST" action={"http://localhost:5000/delete-page/" + entry._id}>
          <input
            type="submit"
            value="DELETE!"
            className="button"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
            }}
          />
        </form>
      );
    } else return <></>;
  }

  return (
    <div className="wiki-pages">
      {entries.map((entry) => {
        return (
          <div key={entry.id} className="wiki-page-entry">
            <h2 className="page-title">
              <Link to={"/wiki/" + entry.id.replace(/ /g, "-")}>{entry.title}</Link>
              {showSettings && (
                <button title="Details">
                  <Link to={"/wiki/details/" + entry._id}>
                    <i className="material-icons">settings</i>
                  </Link>
                </button>
              )}
            </h2>
            <div className="page-tags">
              Tags:
              {entry.tags.map((tag) => {
                return <p key={tag}>{tag}</p>;
              })}
            </div>
            <div className="last-update">
              Last updated: <p>{new Date(entry.updated_date).toLocaleString("en-GB")}</p>
            </div>
            <AdminButtons entry={entry} />
          </div>
        );
      })}
    </div>
  );
}
