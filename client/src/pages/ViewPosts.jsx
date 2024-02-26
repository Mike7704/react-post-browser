import { useState, useEffect } from "react";
import PostContainer from "../components/PostContainer";
import CategorySelect from "../components/CategorySelect";
import "./ViewPosts.css";

const baseURL = import.meta.env.VITE_SERVERURL;

// Fetch and display each post in own container
function ViewPosts() {
  const [filterCategory, setFilterCategory] = useState("All");
  const [posts, setPosts] = useState([]);

  // Fetch all posts on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPosts();
      } catch (error) {
        console.error("Failed to fetch posts: " + error);
      }
    };
    fetchData();
  }, []);

  // Fetch posts
  const fetchPosts = async (category) => {
    // Fetch all posts
    if (!category || category === "All") {
      const response = await fetch(`${baseURL}/posts`);
      const posts = await response.json();
      setPosts(posts);
    }
    // Fetch posts with given category
    else {
      const response = await fetch(`${baseURL}/posts?category=${category}`);
      const posts = await response.json();
      setPosts(posts);
    }
  };

  // Fetch posts based on filter category
  const updateCategoryFilter = (event) => {
    setFilterCategory(event.target.value);
    fetchPosts(event.target.value);
  };

  // Like a post when like button is clicked
  const likePost = async (postID) => {
    const response = await fetch(`${baseURL}/posts/${postID}/like`, {
      method: "PUT",
    });
    if (response.ok) {
      // Fetch posts again after liking a post so page updates
      fetchPosts();
    } else {
      console.error("Failed to delete post");
    }
  };

  // Delete a post when delete button is clicked
  const deletePost = async (postID) => {
    const response = await fetch(`${baseURL}/posts/${postID}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // Fetch posts again after deleting a post so page updates
      fetchPosts();
    } else {
      console.error("Failed to delete post");
    }
  };

  return (
    <div className="view-posts-page">
      <h1 className="title">Posts</h1>
      <div className="filters-container">
        <h3>View Category: </h3>
        <CategorySelect value={filterCategory} onChange={updateCategoryFilter} />
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <PostContainer key={post.id} post={post} likePost={() => likePost(post.id)} deletePost={() => deletePost(post.id)} />
        ))}
      </div>
    </div>
  );
}

export default ViewPosts;
