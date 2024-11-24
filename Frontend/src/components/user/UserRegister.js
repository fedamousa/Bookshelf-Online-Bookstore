import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";

export default function UserRegister() {
  const [userInformation, setUserInformation] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function onChangeHandler(event) {
    setUserInformation({
      ...userInformation,
      [event.target.id]: event.target.value,
    });
  }

  function registerNewUser() {
    const userUrl = "https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users/signUp";

    axios
      .post(userUrl, userInformation)
      .then((res) => {
        console.log(res, "response from post");
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 400) {
          if (err.response.data.errors.Email) {
            alert(err.response.data.errors.Email[0]);
          } else if (err.response.data.errors.Password) {
            alert(err.response.data.errors.Password[0]);
          }
        }
      });
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 className="register-title">Sign Up</h2>
        <p className="register-subtitle">Create Your Account</p>

        <TextField
          id="email"
          label="Email"
          variant="standard"
          onChange={onChangeHandler}
          fullWidth
         
          style={{ marginBottom: '20px' }}
        />

        <TextField
          id="password"
          label="Password"
          variant="standard"
          type="password"
          onChange={onChangeHandler}
          fullWidth
          style={{ marginBottom: '20px' }}
        />

        <Button
          variant="contained"
          fullWidth
          className="submit-button"
          onClick={registerNewUser}
          style={{ marginBottom: '20px' }}
        >
          Sign up
        </Button>

        <p className="footer-text">
          Already a member? <Link to="/login" className="sign-in-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
