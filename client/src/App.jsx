import { useState } from "react";

import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <div>
        <Header />
        <NavBar />
        <Footer />
      </div>
    </>
  );
}

export default App;
