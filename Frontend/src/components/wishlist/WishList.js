import React from "react";
import WishListItem from "./WishListItem";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./WishList.css";

export default function WishList(prop) {
  const { wishList, setWishList} = prop;
  if (wishList.length === 0) {
   return (
    <div className="wish-list">
      <Box  textAlign="center" mt={4}>
        <Typography variant="h5" className="empty-title">
        Your Wishlist is Empty</Typography>
        <Button className="browse-button" variant="contained" color="primary">
          <Link
            to="/books"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            Browse Our Books
          </Link>
        </Button>
      </Box>
      </div>
   );
  }

  return (
    <div className="wish-list">
    <div className="wishlist-container">
      <h2 className="wishlist-title">Wishlist</h2>
      <div className="wishlist-items">
        {wishList.map((book) => (
          <WishListItem key={book.bookId} book={book} wishList={wishList} setWishList={setWishList} />
        ))}
      </div>
    </div>
    </div>
  );
}
