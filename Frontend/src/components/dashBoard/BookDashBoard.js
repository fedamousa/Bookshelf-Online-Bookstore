import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Popover,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import BookItem from "./BookItem";
import "./BookDashBoard.css";

export default function BookDashBoard() {
  const [bookResponse, setBookResponse] = useState({
    books: [],
    totalBooks: 0,
  });
  
  const [categoryList, setCategoryList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [bookInfo, setBookInfo] = useState({
    isbn: "",
    title: "",
    author: "",
    price: 0,
    stockQuantity: 0,
    bookFormat: "",
    categoryName: "",
    imageUrl: "",
  });

  const formats = ["Audio", "Paperback", "Hardcover", "Ebook"];

  useEffect(() => {
    fetchData();
    fetchCategoryList();
  }, []);

  function fetchData() {
    axios.get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books?offset=0&limit=100&search=&minPrice=0&maxPrice=10000")
      .then((response) => setBookResponse(response.data))
      .catch((error) => console.error("Failed to fetch data:", error));
  }

  function fetchCategoryList() {
    axios.get("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Categories")
      .then((response) => setCategoryList(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  function onChangeHandler(event) {
    setBookInfo({
      ...bookInfo,
      [event.target.name]: event.target.value,
    });
  }

  function createBook() {
    const token = localStorage.getItem("token");
    axios.post("https://sda-3-online-backend-teamwork-2-be3r.onrender.com/api/v1/Books", bookInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert("Book created successfully!");
        fetchData();
        setAnchorEl(null);
      }
    })
    .catch((error) => {
      console.error("Error creating book:", error);
      alert("Failed to create book");
    });
  }

  return (
    <div className="book-dashboard">
      <h1 className="dashboard-title">Book Dashboard</h1>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        className="create-book-button"
      >
        Create New Book
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="popover-content">
          <TextField
            name="isbn"
            label="ISBN"
            variant="standard"
            onChange={onChangeHandler}
          />
          <TextField
            name="title"
            label="Title"
            variant="standard"
            onChange={onChangeHandler}
          />
          <TextField
            name="author"
            label="Author"
            variant="standard"
            onChange={onChangeHandler}
          />
          <TextField
            name="price"
            label="Price"
            variant="standard"
            type="number"
            onChange={onChangeHandler}
          />
          <TextField
            name="stockQuantity"
            label="Stock Quantity"
            variant="standard"
            type="number"
            onChange={onChangeHandler}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel>Format</InputLabel>
            <Select
              name="bookFormat"
              value={bookInfo.bookFormat}
              onChange={onChangeHandler}
              label="Format"
            >
              {formats.map((format) => (
                <MenuItem key={format} value={format}>
                  {format}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              name="categoryName"
              value={bookInfo.categoryName}
              onChange={onChangeHandler}
              label="Category"
            >
              {categoryList.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryName}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="imageUrl"
            label="Image URL"
            variant="standard"
            onChange={onChangeHandler}
          />
          <Button onClick={createBook} className="add-book-button">
            Add Book
          </Button>
        </div>
      </Popover>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock Quantity</TableCell>
              <TableCell>Format</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookResponse.books.map((book) => (
              <BookItem key={book.bookId} book={book} fetchData={fetchData} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
