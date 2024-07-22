import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddForm = ({ open, handleClose, handleSubmit }) => {
  const [selectedNameOption, setSelectedNameOption] = useState("");
  const [discountVoucher, setDiscountVoucher] = useState("");
  const [expiryVoucher, setExpiryVoucher] = useState("");
  const [exclusiveVoucher, setExclusiveVoucher] = useState("");

  const handleSelectNameChange = (event) => {
    setSelectedNameOption(event.target.value);
  };
  const handleDiscount = (event) => {
    setDiscountVoucher(event.target.value);
  };
  const handleExpiry = (event) => {
    setExpiryVoucher(event.target.value);
  };
  const handleExclusive = (event) => {
    setExclusiveVoucher(event.target.value);
  };

  const handleAdd = () => {
    handleSubmit(
      selectedNameOption,
      discountVoucher,
      expiryVoucher,
      exclusiveVoucher,
      setSelectedNameOption,
      setDiscountVoucher,
      setExpiryVoucher,
      setExclusiveVoucher
    );
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New voucherData</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Voucher Name"
          type="text"
          fullWidth
          value={selectedNameOption}
          onChange={handleSelectNameChange}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Discount %"
          type="text"
          fullWidth
          value={discountVoucher}
          onChange={handleDiscount}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Exclusive VNĐ"
          type="text"
          fullWidth
          value={exclusiveVoucher}
          onChange={handleExclusive}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Expiry"
          type="text"
          fullWidth
          value={expiryVoucher}
          onChange={handleExpiry}
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
