import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { useEffect, useState } from "react";

export default function PageContent({ page }) {
  const [dates, setDates] = useState({});

  useEffect(() => {
    if (page) {
      let dates = {};
      let date = new Date(page.first_created);
      dates.created_at = date.toLocaleDateString("fi-FI");
      date = new Date(page.updated_date);
      dates.updated_at = date.toLocaleDateString("fi-FI");
      setDates(dates);
    }
  }, [page]);

  return (
    <div>
      {" "}
      <h1>{page.title}</h1>
      <p>
        Tags:{" "}
        {page.tags?.map((tag, index) => {
          return tag + (index < page.tags?.length - 1 ? ", " : "");
        })}
      </p>
      <p>First created: {dates?.created_at}</p>
      <p>Last updated: {dates?.updated_at}</p>
      <p>Author: {page.created_by}</p>
      <MDEditor.Markdown
        source={page.text}
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
      />
    </div>
  );
}
