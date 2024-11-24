import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found-container">
    <img src="/path/to/bg1.jpg" alt="Background" className="background-image" />
    <h1 className="error-code">404</h1>
    <p className="error-message">Sorry, this page does not exist</p>
    <p className="error-submessage">But there are many interesting books!</p>
    <Link to="/books" className="back-to-catalog">
      Go to Catalog
    </Link>
  </div>
  
  );
}
