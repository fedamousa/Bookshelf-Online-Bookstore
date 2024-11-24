import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";

import "./Form.css"

export default function Form({ setSearchByTitle }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle input change locally without triggering search
  const onChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  // Trigger search when Enter key is pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchByTitle(searchTerm); // Trigger search on Enter
      event.preventDefault(); // Prevent the form from submitting (if in a form context)
    }
  };

  // Clear input and reset search
  const handleClear = () => {
    setSearchTerm(""); // Clear local input
    setSearchByTitle(""); // Reset search in the main component
  };

  return (
    <div className="search-form">
      <TextField
        id="standard-basic"
        label="Search"
        variant="standard"
        helperText="Enter a book title"
        value={searchTerm}
        onChange={onChangeHandler}
        onKeyDown={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
