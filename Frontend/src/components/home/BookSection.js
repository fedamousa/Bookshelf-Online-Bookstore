import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./BookSection.css"; 


export default function BookSection() {
  const [books, setBooks] = useState({
    books: [],
    totalBooks: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch books 
    axios
      .get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/books?limit=8&offset=0")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="book-section">
      <p>Unlock New Worlds, One Book at a Time</p>
      <Slider {...settings}>
        {books.books.slice(0, 8).map((book) => (
          <div key={book.bookId} className="book-card">
            <img src={book.imageUrl || "placeholder.jpg"} alt={book.title} className="book-image" />
          </div>
        ))}
      </Slider>
      
    </div>
  );
}
