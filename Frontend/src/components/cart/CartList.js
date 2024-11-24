import React from "react";
import axios from "axios";
import { Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./CartList.css";

export default function CartList(prop) {
  const { cartList, setCartList, userData } = prop;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (cartList.length === 0) {
    return (
      <div className="cart-list">
      <Box  textAlign="center" mt={4}>
        <Typography variant="h5" className="empty-title">
        Your Cart is Empty</Typography>
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

  const totalPrice = cartList.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  const orderDetails = cartList.map((item) => ({
    bookId: item.bookId,
    quantity: item.quantity,
    price: item.price,
  }));

  function checkOut() {
    if (!userData) {
      alert("Please log in to checkout");
      navigate("/login");
      return;
    }

    axios
      .post(
        "https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/orders",
        { OrderItems: orderDetails },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          alert("Order created successfully!");
          navigate("/books");
          setCartList([]);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="cart-list">
    <Box mt={4} className="cart-list-container">
      <Typography variant="h4" className="cart-title">Cart</Typography>
      {cartList.map((cart) => (
        <CartItem
          key={cart.bookId}
          cart={cart}
          cartList={cartList}
          setCartList={setCartList}
        />
      ))}
      <Typography variant="h6" mt={2} className="total-price">
        Total price: ${totalPrice.toFixed(2)}
      </Typography>
      <Button variant="contained" onClick={checkOut} className="checkout-button">
        Checkout
      </Button>
    </Box>
    </div>
  );
}
