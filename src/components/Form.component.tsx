"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const Form = () => {
  return (
    <div className="w-full h-fit mt-4 flex items-start justify-start gap-4 flex-col">
      <span className="font-thin text-lg capitalize">
        Filter healthcare centres
      </span>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select state</InputLabel>
        <Select
          id="state"
          label="State"
          variant="filled"
          placeholder="Select State"
          className="w-full"
          size="small"
        >
          <MenuItem value={10}>Lagos</MenuItem>
          <MenuItem value={20}>Abuja</MenuItem>
          <MenuItem value={30}>Anambra</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select LGA</InputLabel>
        <Select
          id="lga"
          label="LGA"
          variant="filled"
          className="w-full"
          size="small"
        >
          <MenuItem value={10}>Onitsha South</MenuItem>
          <MenuItem value={20}>Onitsha North</MenuItem>
          <MenuItem value={30}>Awka South</MenuItem>
        </Select>
      </FormControl>
      <div className="w-full flex justify-end">
        <Button variant="outlined">Search</Button>
      </div>
    </div>
  );
};

export default Form;
