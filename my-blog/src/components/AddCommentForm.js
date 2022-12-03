import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const { user } = useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    if (token) {
      config.headers.authtoken = token;
    } else {
      config.headers.authtoken = null;
    }
    const response = await axios.post(
      `http://localhost:8000/api/articles/${articleName}/comments`,
      {
        postedBy: name,
        text: commentText,
      },
      config
    );
    const updatedArticle = response.data;
    onArticleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label>
        Comment:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows="4"
          cols="50"
        />
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
