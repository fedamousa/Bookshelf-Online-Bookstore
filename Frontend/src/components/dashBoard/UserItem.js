import React from "react";
import axios from "axios";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./UserItem.css";

export default function UserItem(prop) {
  const { user, fetchUserList } = prop;
  
  function deleteUser() {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/users/${user.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.data === 201 || res.data === 204) {
          alert("User deleted successfully.");
          fetchUserList();
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <TableRow>
      <TableCell className="user-id-cell">{user.userId}</TableCell>
      <TableCell className="user-email-cell">{user.email}</TableCell>
      <TableCell className="user-name-cell">{user.name}</TableCell>
      <TableCell className="user-phone-cell">{user.phone}</TableCell>
      <TableCell className="user-role-cell">{user.role}</TableCell>
      <TableCell align="center" className="user-actions-cell">
        <IconButton onClick={deleteUser} className="delete-button">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
