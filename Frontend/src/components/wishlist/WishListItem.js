import React from "react";
import { Link } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { IconButton } from "@mui/material";
import "./WishListItem.css";

export default function WishListItem(prop) {
  const { book, wishList, setWishList } = prop;
  const isWishlisted = wishList.some((item) => item.bookId === book.bookId);

  function toggleFav() {
    if (isWishlisted) {
      setWishList(wishList.filter((item) => item.bookId !== book.bookId));
    } else {
      setWishList([...wishList, book]);
    }
  }

  return (
    <div className="wishlist-item">
      <div className="bookmark-container">
        <IconButton className="bookmark-icon" onClick={toggleFav}>
          {isWishlisted ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
      </div>

      <div className="wishlist-item-details">
        <p className="wishlist-item-title">{book.title}</p>
        <p className="wishlist-item-price">${book.price.toFixed(2)}</p>
        <Link to={`/books/${book.bookId}`}>
          <img
            src={book.imageUrl}
            alt={book.title}
            className="wishlist-item-image"
          />
        </Link>
      </div>
    </div>
  );
}
