import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard"; 
import { Menu, MenuItem, IconButton } from "@mui/material";
import logo from "../../images/logo_transparent.png";
import { ImBooks } from "react-icons/im";
import "./NavBar.css";

export default function NavBar(props) {
  const { wishList, isAuthenticated, userData, cartList } = props;
  const arrayLength = wishList.length;
  const cartItems = cartList.length;
  const navigate = useNavigate();

  // State for the dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Open menu handler
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu handler
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Menu item navigation handler
  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  return (
    <section className="Header"> 
      <nav>
        <div className="nav-links">
          <Link to="/">
            <img src={logo} alt="BookShelf Logo" className="logo-image" />
          </Link>
          <ul>
            <li>
              <Link to="/" >
                <HomeIcon className="navbar-icon" /> 
              </Link>
            </li>

            <li>
              <Link to="/books">
                <ImBooks className="navbar-icon" /> 
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <Badge badgeContent={cartItems} color="primary">
                  <ShoppingCartIcon className="navbar-icon" /> 
                </Badge>
              </Link>
            </li>

            <li>
              <Link to="/wishList">
                <Badge badgeContent={arrayLength} color="primary" overlap="circular">
                  <BookIcon className="navbar-icon" /> 
                </Badge>
              </Link>
            </li>

            {/* Dashboard Dropdown for Admin */}
            {isAuthenticated && userData.role === "Admin" && (
              <li>
                <IconButton onClick={handleMenuClick} color="inherit">
                  <DashboardIcon className="navbar-icon" /> 
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={() => handleMenuItemClick("/book-dashboard")}>
                    Books Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/user-dashboard")}>
                    Users Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => handleMenuItemClick("/order-dashboard")}>
                    Orders Dashboard
                  </MenuItem>
                </Menu>
              </li>
            )}

            <li>
              <Link to={userData ? "/profile" : "/register"}>
                <AccountCircleIcon className="navbar-icon" /> 
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}
