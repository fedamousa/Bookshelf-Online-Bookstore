import React, { useState, useEffect } from "react"; 
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UserItem from "./UserItem";
import "./UserDashBoard.css";

export default function UserDashBoard() {
  const [userList, setUserList] = useState([]);

  function fetchUserList() {
    const token = localStorage.getItem("token");
    axios
      .get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUserList(res.data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div className="user-dashboard">
      <h1 className="dashboard-title">User Dashboard</h1>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => (
              <UserItem key={user.userId} user={user} fetchUserList={fetchUserList} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
