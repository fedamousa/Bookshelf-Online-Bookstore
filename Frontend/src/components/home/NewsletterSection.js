import React from "react";
import "./NewsletterSection.css";

export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h2>Subscribe to our newsletter for the newest book updates</h2>
        <div className="newsletter-input-group">
          <input
            type="email"
            placeholder="Type your email here"
            className="newsletter-input"
          />
          <button className="newsletter-button">Subscribe</button>
        </div>
      </div>
    </section>
  );
}
