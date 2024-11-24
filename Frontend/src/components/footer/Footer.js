import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../images/logo_transparent.png"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
      
        <div className="footer-section about">
        <img className="logo" src={logo} alt="BookShelf Logo"  />
          
        </div>

       
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

       
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: info@bookstore.com</p>
          <p>Phone: +123 456 7890</p>
         
        </div>

      
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} BookStore | All Rights Reserved
      </div>
    </footer>
  );
}
