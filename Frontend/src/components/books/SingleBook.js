import React from "react";
import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import "./SingleBook.css";

export default function SingleBook({ book, wishList, setWishList, cartList, setCartList }) {
  const isWishlisted = wishList.some((item) => item.bookId === book.bookId);

  function toggleFav() {
    if (isWishlisted) {
      setWishList(wishList.filter((item) => item.bookId !== book.bookId));
    } else {
      setWishList([...wishList, book]);
    }
  }

  function addToCart() {
    if (!cartList.some((item) => item.bookId === book.bookId)) {
      setCartList([...cartList, { ...book, quantity: 1 }]);
    }
  }

  return (
    <div className="bookCard">
      <IconButton
        className="bookmark-icon"
        onClick={toggleFav}
      >
        {isWishlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
      <Link to={`/books/${book.bookId}`}>
        <img src={book.imageUrl} alt={book.title} />
      </Link>
      <p className="book-author">{book.author}</p>
      <p className="book-title">{book.title}</p>
      <p className="book-price">${book.price}</p>
      <Button
        onClick={addToCart}
        variant="outlined"
        color="primary"
        className="add-to-cart-btn"
      >
        Add to cart
      </Button>
    </div>
  );
}
