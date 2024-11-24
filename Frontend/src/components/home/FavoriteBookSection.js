import React from "react";
import "./FavoriteBookSection.css";
import { FiArrowRight } from "react-icons/fi"; 
import { Link } from "react-router-dom";

export default function FavoriteBookSection() {
  return (
    <div className="parent-container">
    <section className="favorite-book-section">
      <div className="favorite-book-overlay">
        <p> Book Your Favorite Book! </p>

        <Link  to="/books">
        <button className="favorite-book-button">
          <FiArrowRight className="arrow-icon" />
        </button>
        </Link>
      </div>
    </section>
    </div>
  );
}
