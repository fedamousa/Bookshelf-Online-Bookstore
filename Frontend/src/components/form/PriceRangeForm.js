import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import InputAdornment from "@mui/material/InputAdornment";

import "./PriceRangeForm.css"

export default function PriceRangeForm({ setMinPrice, setMaxPrice }) {
  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  // Update the parent min price only when Enter is pressed
  const handleMinKeyPress = (event) => {
    if (event.key === "Enter") {
      setMinPrice(Number(minValue)); // Only updates the parent state
      event.preventDefault(); // Prevents form submission or page refresh
    }
  };

  // Update the parent max price only when Enter is pressed
  const handleMaxKeyPress = (event) => {
    if (event.key === "Enter") {
      setMaxPrice(Number(maxValue)); // Only updates the parent state
      event.preventDefault(); // Prevents form submission or page refresh
    }
  };

  // Clear min price input
  const handleClearMin = () => {
    setMinValue('');
    setMinPrice(null); // Reset filter in parent
  };

  // Clear max price input
  const handleClearMax = () => {
    setMaxValue('');
    setMaxPrice(null); // Reset filter in parent
  };

  return (
    <div className="price-range-form">
      <TextField
        id="standard-basic-min"
        label="Min price"
        variant="standard"
        helperText="Enter min price"
        type="number"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
        onKeyDown={handleMinKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClearMin} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <TextField
        id="standard-basic-max"
        label="Max price"
        variant="standard"
        helperText="Enter max price"
        type="number"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
        onKeyDown={handleMaxKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClearMax} size="small">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
