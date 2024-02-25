import { Route, Routes, Link } from "react-router-dom";

import Home from "../pages/Home";
import ViewPosts from "../pages/ViewPosts";
import NewPost from "../pages/NewPost";
import NotFound from "../pages/NotFound";

function NavBar() {
  return (
    <div>
      <nav className="nav-bar">
        <Link to="/home">Home</Link>
        <Link to="/viewposts">Posts</Link>
        <Link to="/newpost">Add Post</Link>
      </nav>
      {
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viewposts" element={<ViewPosts />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      }
    </div>
  );
}

export default NavBar;
