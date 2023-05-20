import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  async function makeSearch(e) {
    if (e.key !== "Enter") return;
    navigate("/search/" + search);
  }
  return (
    <div className="search">
      <input
        type="text"
        className="searchBar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={(e) => makeSearch(e)}
        placeholder="Search..."
      />
      <i className="material-icons-outlined">search_outlined</i>
    </div>
  );
}
