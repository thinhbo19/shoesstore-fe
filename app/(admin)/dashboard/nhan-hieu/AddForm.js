import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddForm = ({ open, handleClose, handleSubmit }) => {
  const [brandName, setBrandName] = useState("");

  const handleNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleAdd = () => {
    handleSubmit(brandName, setBrandName);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Brands</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Brand Name"
          type="text"
          fullWidth
          value={brandName}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleAdd();
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddForm;
