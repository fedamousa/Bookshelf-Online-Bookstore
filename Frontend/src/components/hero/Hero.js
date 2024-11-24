import React from 'react';
import './Hero.css';
import headerVideo from '../../images/header2.mp4';
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      {/* Background Video */}
      <div className="video-container">
        <video autoPlay loop muted playsInline className="video-back">
          <source src={headerVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Overlay */}
      <div className="hero-content">
        <h1>Discover Your </h1>
        <p>Next Great Read.</p>
        <br />
        <Link to="/books" className="back-to-catalog">
      Go to Catalog
    </Link>
      </div>
    </section>
  );
}
