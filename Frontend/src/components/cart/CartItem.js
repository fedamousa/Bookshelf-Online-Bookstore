import React from "react";
import { Button, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";
import { Link } from "react-router-dom";

export default function CartItem({ cart, cartList, setCartList }) {
  function increaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.bookId === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  function decreaseProductQuantity(id) {
    const newCartList = cartList.map((item) => {
      if (item.bookId === id) {
        return item.quantity === 1 ? item : { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartList(newCartList);
  }

  const handleRemoveItem = (itemId) => {
    setCartList((prevCartList) => prevCartList.filter((item) => item.bookId !== itemId));
  };

  return (
    <Box className="cart-item">
      <Link to={`/books/${cart.bookId}`}>
      <img src={cart.imageUrl} alt={cart.title} className="cart-item-image" />
        </Link>
     
      <Box className="cart-item-details">
        <Typography variant="h6" className="cart-item-title">{cart.title}</Typography>
        <Typography variant="body1" className="cart-item-price">Price: ${cart.price}</Typography>
      </Box>

      <Box className="cart-item-quantity">
        <Button
          variant="outlined"
          onClick={() => decreaseProductQuantity(cart.bookId)}
          className="quantity-button"
        >
          -
        </Button>
        <Typography className="quantity-text">{cart.quantity}</Typography>
        <Button
          variant="outlined"
          onClick={() => increaseProductQuantity(cart.bookId)}
          className="quantity-button"
        >
          +
        </Button>
      </Box>

      <IconButton onClick={() => handleRemoveItem(cart.bookId)} className="remove-icon">
        <DeleteIcon color="error" />
      </IconButton>
    </Box>
  );
}
