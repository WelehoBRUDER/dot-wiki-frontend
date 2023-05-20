import React, { useState } from "react";
import "../css/new_page.scss";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import User from "../modules/User";
import Input from "../reusable_components/Input";
import axios from "axios";

export default function EditPage({ exactID, id, Title, Tags, MainText }) {
  const [uniqueId, setUniqueId] = useState(id);
  const [title, setTitle] = useState(Title);
  const [tags, setTags] = useState(Tags.join(", "));
  const [mainText, setMainText] = useState(MainText);
  const showdown = require("showdown"),
    converter = new showdown.Converter();

  function handleSubmit() {
    if (User.isAuthorized()) {
      axios
        .post("http://localhost:5000/edit-page/" + exactID, {
          id: uniqueId,
          title: title,
          tags: tags,
          text: mainText,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <form
      method="POST"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Input
        type="text"
        id="id"
        name="id"
        label="Unique ID"
        value={uniqueId}
        onChange={(e) => {
          setUniqueId(e.target.value);
        }}
        required
      />
      <Input
        type="text"
        id="title"
        name="title"
        label="Entry title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        required
      />
      <input
        type="text"
        id="text"
        name="text"
        value={converter.makeHtml(mainText)}
        hidden
        required
      />
      <input
        type="text"
        id="username"
        name="username"
        hidden
        value={User.getId()}
      />
      <MDEditor
        value={mainText}
        onChange={setMainText}
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
        name="text"
        height={800}
      />
      <Input
        type="text"
        id="tags"
        name="tags"
        label="Tags (separated by comma)"
        value={tags}
        onChange={(e) => {
          setTags(e.target.value);
        }}
        required
      />
      <input
        type="submit"
        className="button"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/image/menu_button.png)`,
        }}
      />
    </form>
  );
}
