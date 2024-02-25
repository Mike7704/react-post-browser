import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/viewposts">Posts</Link>
        <Link to="/newpost">Add Post</Link>
      </nav>
    </div>
  );
}

export default NavBar;
