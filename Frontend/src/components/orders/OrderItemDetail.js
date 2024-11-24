import React from "react";
import { Typography, Divider } from "@mui/material";
import "./OrderItemDetail.css";

export default function OrderItemDetail({ item }) {
  return (
    <div className="order-item-detail">
      <Typography variant="body1" className="item-title">
        {item.bookTitle}
      </Typography>
      <Typography variant="body2">
        <strong>Book ID:</strong> {item.bookId}
      </Typography>
      <Typography variant="body2">
        <strong>Price:</strong> ${item.price.toFixed(2)}
      </Typography>
      <Typography variant="body2">
        <strong>Quantity:</strong> {item.quantity}
      </Typography>
      <Divider className="item-divider" />
    </div>
  );
}
