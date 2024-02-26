import "../pages/ViewPosts.css";

export default function PostContainer({ post, likePost, deletePost }) {
  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p className="message">{post.content}</p>
      <p>{post.category}</p>
      <button onClick={likePost}>👍 {post.likes}</button>
      <button onClick={deletePost}>Delete</button>
    </div>
  );
}
