import { useState } from "react";
import CategorySelect from "../components/CategorySelect";
import "./NewPost.css";

function NewPost() {
  // form values with initial values
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
  });
  const [filterCategory, setFilterCategory] = useState("All");

  function submitPost(event) {
    event.preventDefault();
    console.log("The form values are", formValues);
  }

  function handleInputChange(event) {
    setFormValues({
      ...formValues, // the spread operator will add all existing values
      [event.target.name]: event.target.value, // then we add the new value using the form field "name" attribute and the value
    });
  }

  const updateCategoryFilter = (event) => {
    setFilterCategory(event.target.value);
  };

  return (
    <div className="new-post-page">
      <h1 className="title">Add a new post</h1>
      <form onSubmit={submitPost}>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" maxLength={25} value={formValues.title} onChange={handleInputChange} />
        <label htmlFor="content">Content:</label>
        <input type="text" id="content" name="content" maxLength={150} value={formValues.content} onChange={handleInputChange} />
        <p>Current value is: {formValues.title}</p>
        <p>Current value is: {formValues.content}</p>
        <button type="submit">Submit</button>
      </form>
      <div className="filters-container">
        <p>Category: </p>
        <CategorySelect value={filterCategory} onChange={updateCategoryFilter} />
      </div>
    </div>
  );
}

export default NewPost;
