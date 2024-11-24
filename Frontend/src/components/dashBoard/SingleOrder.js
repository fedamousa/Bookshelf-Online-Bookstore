import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import "./SingleOrder.css"
export default function SingleOrder({ order, fetchUsersOrders }) {
  const [status, setStatus] = useState(order.orderStatus);

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    const token = localStorage.getItem("token");
    axios
      .put(
        `https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/orders/${order.orderId}`,
        {
          orderStatus: newStatus,
          totalPrice: order.totalPrice,
          dateUpdated: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => fetchUsersOrders())
      .catch((error) => console.log(error));
  };

  return (
    <TableRow>
      <TableCell className="order-id-cell">{order.orderId}</TableCell>
      <TableCell className="user-id-cell">{order.userId}</TableCell>
      <TableCell className="date-created-cell">{new Date(order.dateCreated).toLocaleDateString()}</TableCell>
      <TableCell className="status-cell">
        <Select
          value={status}
          onChange={handleStatusChange}
          displayEmpty
          variant="outlined"
        >
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Shipped">Shipped</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </TableCell>
      <TableCell className="items-cell">
        {order.orderItems.map((item) => (
          <div key={item.orderItemId} className="order-items">
            {item.bookTitle} (Qty: {item.quantity}, Price: ${item.price})
          </div>
        ))}
      </TableCell>
      <TableCell className="total-price-cell order-price">${order.totalPrice.toFixed(2)}</TableCell>
    </TableRow>
  );
}
