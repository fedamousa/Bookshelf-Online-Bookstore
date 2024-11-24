import React, { useState } from "react";
import OrderItemDetail from "./OrderItemDetail";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./OrderItem.css";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand, theme }) => ({
  marginLeft: "auto",
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function OrderItem({ order }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className="order-card">
      <CardContent>
        <Typography variant="h6" className="order-id">
          Order ID: {order.orderId}
        </Typography>
        <Typography variant="body1">
          Date: {new Date(order.dateCreated).toLocaleDateString()}
        </Typography>
        <Typography variant="body1">Status: {order.orderStatus}</Typography>
        <Typography variant="body1" className="order-total-price">
          Total Price: ${order.totalPrice.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" className="view-items-text">
          View Items
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          className="expand-button"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {order.orderItems.map((item) => (
            <OrderItemDetail key={item.orderItemId} item={item} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
