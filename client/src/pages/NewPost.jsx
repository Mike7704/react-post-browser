import { useState } from "react";
import CategorySelect from "../components/CategorySelect";
import "./NewPost.css";

const baseURL = import.meta.env.VITE_SERVERURL;

function NewPost() {
  const [categorySelect, setCategorySelect] = useState("Food");
  const [infoMessage, setInfoMessage] = useState("");

  const updateCategorySelect = (event) => {
    setCategorySelect(event.target.value);
  };

  // Create a post and add it to the posts database
  const submitPost = async (event) => {
    event.preventDefault();
    // Read form data (title, content, category)
    const formData = new FormData(event.target);
    const postData = {
      title: formData.get("title"),
      content: formData.get("content"),
      category: categorySelect,
    };

    // Send data to server to add a new post to the database
    const response = await fetch(`${baseURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    if (response.ok) {
      setInfoMessage("Post sent");
    } else {
      setInfoMessage("Failed to send post");
      console.error("Failed to send post");
    }
  };

  return (
    <div className="new-post-page">
      <h1 className="title">Add a new post</h1>
      <form onSubmit={submitPost}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" required maxLength={25} />
        <label htmlFor="content">Content:</label>
        <input type="text" id="content" name="content" required maxLength={100} />
        <div className="categories-container">
          <p>Category: </p>
          <CategorySelect value={categorySelect} onChange={updateCategorySelect} showAllOption={false} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{infoMessage}</p>
    </div>
  );
}

export default NewPost;
