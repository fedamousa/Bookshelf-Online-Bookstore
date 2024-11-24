import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SingleOrder from "./SingleOrder";
import "./OrderDashBoard.css";

export default function OrderDashBoard() {
  const [usersOrders, setUsersOrders] = useState([]);

  function fetchUsersOrders() {
    const token = localStorage.getItem("token");
    axios
      .get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsersOrders(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUsersOrders();
  }, []);

  return (
    <div className="order-dashboard">
      <h1 className="dashboard-title">Order Dashboard</h1>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="orders table">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersOrders.map((order) => (
              <SingleOrder key={order.orderId} order={order} fetchUsersOrders={fetchUsersOrders} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
