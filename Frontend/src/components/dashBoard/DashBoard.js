import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./DashBoard.css";

export default function DashBoard() {
  return (
    <div className="dash-board">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Dashboard</h2>
        
        <Link to="/book-dashboard" className="dashboard-link">
          <Button variant="contained" className="dashboard-button">
            Books Dashboard
          </Button>
        </Link>

        <Link to="/user-dashboard" className="dashboard-link">
          <Button variant="contained" className="dashboard-button">
            Users Dashboard
          </Button>
        </Link>

        <Link to="/order-dashboard" className="dashboard-link">
          <Button variant="contained" className="dashboard-button">
            Orders Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
