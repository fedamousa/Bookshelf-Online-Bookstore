import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, FormControl, Input, InputLabel, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";

import "./UserLogin.css";

export default function UserLogin({ getUserData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userLogIn, setUserLogIn] = useState({
    email: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const navigate = useNavigate();

  function onChangeHandlerEmailLogIn(event) {
    setUserLogIn({ ...userLogIn, email: event.target.value });
  }

  function onChangeHandlerPasswordLogIn(event) {
    setUserLogIn({ ...userLogIn, password: event.target.value });
  }

  function logInUser() {
    const userUrlLogIn = "https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Users/signIn";
    axios
      .post(userUrlLogIn, userLogIn)
      .then((res) => {
        console.log(res, "response from log in");
        if (res.status === 200) {
          localStorage.setItem("token", res.data);
        }
      })
      .then(() => getUserData())
      .then(() => navigate("/profile"))
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert(error.response.data.message);
        }
      });
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Log In</h2>
        <p className="login-subtitle">Welcome back! Please log in to continue.</p>

        <TextField
          id="email"
          label="Email"
          variant="standard"
          onChange={onChangeHandlerEmailLogIn}
          fullWidth
          className="custom-textfield"
        />

        <FormControl fullWidth variant="standard" className="custom-form-control">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={onChangeHandlerPasswordLogIn}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "hide password" : "show password"}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          className="submit-button"
          onClick={logInUser}
        >
          Log in
        </Button>

        <p className="footer-text">
          Do not have an account yet? <Link to="/register" className="sign-in-link">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
