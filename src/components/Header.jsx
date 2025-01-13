// src/components/Header.jsx
import React from "react";
import "./../styles/HeaderFooter.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/polls">Polls</Link>
        <Link to="/results">Results</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
