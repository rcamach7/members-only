import axios from "axios";
import { useState } from "react";

function PostForm(props) {
  const [post, setPost] = useState({
    title: "",
    message: "",
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/posts/", post).then((results) => {
      // If errors are returned, print them.
      if (results.data.errors) {
        setErrors(results.data.errors);
      } else {
        window.location.reload();
      }
    });
  };

  return (
    <div className="formBackdrop">
      <form className="PostForm" onSubmit={(e) => handleSubmit(e)}>
        <p className="close-icon" onClick={() => props.setShowPostForm(false)}>
          X
        </p>

        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          minLength="2"
          onChange={(e) => setPost({ ...post, [e.target.id]: e.target.value })}
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          type="text"
          id="message"
          minLength="2"
          onChange={(e) => setPost({ ...post, [e.target.id]: e.target.value })}
          required
        />

        {/* Display any returned errors from out API */}
        {errors.map((error, i) => {
          return (
            <p key={i} style={{ color: "red", fontSize: "14px" }}>
              {error.msg}
            </p>
          );
        })}
        <input type="submit" className="btn" style={{ marginTop: "auto" }} />
      </form>
    </div>
  );
}

export default PostForm;
