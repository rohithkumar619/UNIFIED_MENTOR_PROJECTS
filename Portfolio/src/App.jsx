import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import "./App.css";
const App = () => {
  return (
    <div>
      <Home />
      <About />
      <Portfolio />
      <Contact />
    </div>
  );
};

export default App;
