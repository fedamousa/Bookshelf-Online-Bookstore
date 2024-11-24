import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import "./BookItem.css";

export default function BookItem({ book, fetchData }) {
  const [open, setOpen] = useState(false);
  const [updateInfo, setUpdateInfo] = useState({
    isbn: book.isbn,
    title: book.title,
    author: book.author,
    price: book.price,
    stockQuantity: book.stockQuantity,
    categoryId: book.category.categoryId,
    imageUrl: book.imageUrl,
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    setUpdateInfo({
      ...updateInfo,
      [event.target.name]: event.target.value,
    });
  };

  const updateBookById = () => {
    const token = localStorage.getItem("token");
    axios
      .put(`https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books/${book.bookId}`, updateInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          alert("Book updated successfully!");
          fetchData();
          handleClose();
        }
      })
      .catch((error) => {
        console.error("Error updating book:", error);
        alert("Failed to update book");
      });
  };

  const deleteBookById = () => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this book?")) {
      axios
        .delete(`https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books/${book.bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 204 ) {
            alert("Book deleted successfully!");
            fetchData();
          }
        })
        .catch((error) => console.error("Error deleting book:", error));
    }
  };

  return (

    <TableRow>
    <TableCell className="book-item-image-cell">
    <img src={book.imageUrl} alt={book.title} className="book-item-image" />
  </TableCell>
  <TableCell className="book-title-cell">
    <Link to={`/books/${book.bookId}`}>{book.title}</Link>
  </TableCell>
  <TableCell className="book-author-cell">{book.author}</TableCell>
  <TableCell className="book-price-cell">${book.price.toFixed(2)}</TableCell>
  <TableCell className="book-stock-cell">{book.stockQuantity}</TableCell>
  <TableCell className="book-format-cell">{book.bookFormat}</TableCell>
  <TableCell className="book-category-cell">{book.category.categoryName}</TableCell>
  <TableCell className="book-actions-cell">
    <IconButton onClick={handleClickOpen} className="update-button">
      <EditIcon />
    </IconButton>
    <IconButton onClick={deleteBookById} className="delete-button">
      <DeleteIcon />
    </IconButton>
  </TableCell>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Book</DialogTitle>
        <DialogContent>
          <TextField
            name="isbn"
            label="ISBN"
            value={updateInfo.isbn}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            name="title"
            label="Title"
            value={updateInfo.title}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            name="author"
            label="Author"
            value={updateInfo.author}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={updateInfo.price}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            name="stockQuantity"
            label="Stock Quantity"
            type="number"
            value={updateInfo.stockQuantity}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
          <TextField
            name="imageUrl"
            label="Image URL"
            value={updateInfo.imageUrl}
            onChange={handleInputChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={updateBookById} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
}
