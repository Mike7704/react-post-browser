import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ViewPosts from "./pages/ViewPosts";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="page">
      <Header />
      <NavBar />
      <div className="page-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/viewposts" element={<ViewPosts />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
