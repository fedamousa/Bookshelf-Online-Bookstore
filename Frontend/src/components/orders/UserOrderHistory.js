import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderItem from "./OrderItem";
import { Container, Typography, CircularProgress } from "@mui/material";
import "./UserOrderHistory.css";

export default function UserOrderHistory({ userData }) {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData?.userId) {
      getOrderByUserId();
    }
  }, [userData]);

  const getOrderByUserId = () => {
    const token = localStorage.getItem("token");
    const url = `https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/orders/user/${userData.userId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setOrderList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching orders:", error);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="order-history-loading">
        <CircularProgress />
      </div>
    );
  }

  if (orderList.length === 0) {
    return (
      <Container className="order-list-container">
        <Typography variant="h6" align="center">
          No order history found.
        </Typography>
      </Container>
    );
  }

  return (
    <div className="order-history">  
       <Container className="order-list-container">
      <Typography variant="h4" className="order-history-title">
        Order History
      </Typography>
      <div className="order-list">
        {orderList.map((order) => (
          <OrderItem key={order.orderId} order={order} />
        ))}
      </div>
    </Container>
    </div>
  );
}
