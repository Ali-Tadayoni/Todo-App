import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

interface InputProps {
  onSetState: (value: string) => void;
  type?: "title" | "estimate";
}

const Input: React.FC<InputProps> = ({ onSetState, type }) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (type === "estimate") {
      const numericValue = parseFloat(newValue);
      if (isNaN(numericValue) || numericValue <= 0) {
        setError("Estimate must be a number greater than 0");
      } else {
        setError("");
      }
    } else {
      if (newValue.trim() === "") {
        setError("Title cannot be empty");
      } else {
        setError("");
      }
    }

    if (!error) {
      onSetState(newValue);
    }
  };

  return (
    <Box sx={{ pt: 2, width: "100%" }}>
      <TextField
        required
        error={!!error}
        helperText={error}
        sx={{ width: "100%" }}
        id="outlined-basic"
        label={type === "estimate" ? "Estimate" : "Name"}
        variant="outlined"
        value={value}
        onChange={handleChange}
      />
    </Box>
  );
};

export default Input;
