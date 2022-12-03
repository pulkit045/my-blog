import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import articles from "./article-content";

var config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
};

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const { articleId } = useParams();
  const  user  = useUser();

  
  useEffect(() => {
    

    const loadArticleInfo = async () => {

      console.log(user.user.accessToken);
      const token =user.user.accessToken;
      // console.log(token);
      if (token) {
        config.headers.Authorization = 'Bearer ' +token;
      } else {
        config.headers.Authorization = null;
      }

      const response = await axios.get(
        `http://localhost:8000/api/articles/${articleId}`,
        config
      );
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }; 
 
    loadArticleInfo();
  }, []);

  const article = articles.find((article) => article.name === articleId);



  const addUpvote = async () => {

    //console.log(user);
    const token =user.user.accessToken;
    // console.log(token);
    if (token) {
      config.headers.Authorization = 'Bearer ' +token;
    } else {
      config.headers.Authorization = null;
    }

    //console.log("config ",config.headers.Authorization);
    const response = await axios.put(
      `http://localhost:8000/api/articles/${articleId}/upvote`,
      null,
      config
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      <div className="upvotes-section">
        {user ? (
          <button onClick={addUpvote}>Upvote</button>
        ) : (
          <button>Log in to upvote</button>
        )}
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleId}
          onArticleUpdated={(updatedArticle) => setArticleInfo(updatedArticle)}
        />
      ) : (
        <button>Log in to add a comment</button>
      )}

      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
