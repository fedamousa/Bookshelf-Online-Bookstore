import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import IconButton from "@mui/material/IconButton";
import "./BookDetails.css";

export default function BookDetails(props) {
  const {
    wishList,
    setWishList,
    cartList,
    setCartList
  } = props;

  const params = useParams();
  const bookId = params.bookId;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books/${bookId}`;

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  // Check if the book is already in the wishlist and cart
  const isInWishlist = wishList.some(item => item.bookId === bookId);
  const isInCart = cartList.some(item => item.bookId === bookId);

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      setWishList([...wishList, book]);
    }
  };

  const handleRemoveFromWishlist = () => {
    setWishList(wishList.filter(item => item.bookId !== bookId));
  };

  const handleAddToCart = () => {
    if (!isInCart) {
      setCartList([...cartList, { ...book, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = () => {
    setCartList(cartList.filter(item => item.bookId !== bookId));
  };

  if (loading) {
    return <div>Please wait 1 second</div>;
  }

  if (error) {
    return (
      <div>
        <p>Not found</p>
      </div>
    );
  }

  return (
    <div className="book-details-container">
      <img src={book.imageUrl} alt={book.title} className="book-image" />
      <div className="book-info">
        <div className="book-header">
          <h2 className="book-title">{book.title}</h2>
          <IconButton onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist} color="primary">
            {isInWishlist ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
        <p className="book-author">{book.author}</p>
        <div className="book-details">
          <p>ISBN: {book.isbn}</p>
          <p>Format: {book.bookFormat}</p>
          <p>Language: English</p>
        </div>
        <div className="book-price">${book.price}</div>
        <div className="book-actions">
          {isInCart ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRemoveFromCart}
            >
              Remove from Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          )}
        </div>
        <Link to="/books" className="back-link">
          Go back
        </Link>
      </div>
    </div>
  );
}
