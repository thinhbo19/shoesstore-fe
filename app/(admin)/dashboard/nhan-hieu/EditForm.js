import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const EditForm = ({ openEdit, handleCloseEdit, hanleEdit }) => {
  const [brandName, setBrandName] = useState("");

  const handleNameChange = (event) => {
    setBrandName(event.target.value);
  };
  const handleSubmitEdit = async () => {
    hanleEdit(brandName, setBrandName);
    handleCloseEdit();
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit}>
      <DialogTitle>Edit</DialogTitle>
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
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button onClick={() => handleSubmitEdit()} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
