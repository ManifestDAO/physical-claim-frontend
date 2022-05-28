import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Inventory from "./views/Inventory";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route key="1" path="/" element={<Home />} />
          <Route key="2" path="/inventory" element={<Inventory />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
