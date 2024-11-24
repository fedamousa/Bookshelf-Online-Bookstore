import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { Link } from "react-router-dom";
import "./UserProfile.css";

export default function UserProfile(prop) {
  const { userData, setUserData } = prop;
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [address, setAddress] = useState(userData.address || "");

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  const updateUserProfile = () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found. Redirecting to login.");
      setUserData(null); // Log out if there's no token
      return;
    }
  
    // Send updated data to backend
    axios
      .put(
        `https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users/${userData.userId}`,
        {
          name,
          email,
          phone,
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsEditable(false); // Make fields read-only after saving

        // Fetch the updated user data
        return axios.get(`https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users/${userData.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
      .then((res) => {
        setUserData(res.data); 
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        
        if (error.response && error.response.status === 401) {
          alert("Session expired, please log in again.");
          localStorage.removeItem("token");
          setUserData(null);
        }
      });
  };
  

  return (
    <div className="profile-container">
      

    <div  className="profile-form">
    <h2 className="register-title">Profile</h2>
      <AccountCircleIcon alt="User Avatar" src={userData.avatar} className="profile-avatar" style={{ width: '150px', height: '150px' }}/>

      <div className="profile-info">
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            readOnly: !isEditable,
          }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            readOnly: !isEditable,
          }}
        />
        <TextField
          label="Phone"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          InputProps={{
            readOnly: !isEditable,
          }}
        />
        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          InputProps={{
            readOnly: !isEditable,
          }}
        />
      </div>

      <div className="button-container">
  <Button
    variant="contained"
    onClick={isEditable ? updateUserProfile : handleEditToggle}
    className="edit-save-btn"
  >
    {isEditable ? "Save Changes" : "Edit Profile"}
  </Button>

  <Button variant="contained" className="order-history-btn">
    <Link to="/orders">Order History</Link>
  </Button>

  <Button variant="contained" onClick={() => setUserData(null)} className="logout-btn">
    Log out
  </Button>
</div>
</div>
    </div>
  );
}
