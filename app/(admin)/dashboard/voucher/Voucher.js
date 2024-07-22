"use client";
import "../AdminScreen.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { useSelector } from "react-redux";
import AddForm from "./AddForm";
import List from "./List";
import { formatVocher } from "@/hooks/useFormatTime";
import moment from "moment-timezone";
import {
  deleteVoucher,
  postVoucher,
  reloadVoucer,
} from "@/services/Redux/handle/hanldeVoucher";

const Voucher = ({ voucherData }) => {
  const accessToken = useSelector(selectAccessToken);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const now = moment().tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD");

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(voucherData);
    } else {
      const filteredBreeds = voucherData.filter((cop) =>
        cop.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filteredBreeds);
    }
  }, [searchTerm, voucherData]);

  const handleSelect = (event) => {
    const id = event.target.getAttribute("data-id");
    const isChecked = event.target.checked;
    let newSelectedIds = [...selectedIds];

    if (isChecked) {
      newSelectedIds.push(id);
    } else {
      newSelectedIds = newSelectedIds.filter((selectedId) => selectedId !== id);
    }
    setSelectedIds(newSelectedIds);
  };
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const ids = [];
    const checkboxes = document.querySelectorAll(
      "tbody input[type='checkbox']"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = isChecked;
      ids.push(checkbox.getAttribute("data-id"));
    });
    setSelectedIds(isChecked ? ids : []);
  };
  const handleSubmit = async (
    selectedNameOption,
    discountVoucher,
    expiryVoucher,
    exclusiveVoucher,
    setSelectedNameOption,
    setDiscountVoucher,
    setExpiryVoucher,
    setExclusiveVoucher
  ) => {
    try {
      const res = await postVoucher(
        accessToken,
        selectedNameOption,
        discountVoucher,
        expiryVoucher,
        exclusiveVoucher
      );
      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setSelectedNameOption("");
      setDiscountVoucher("");
      setExpiryVoucher("");
      setExclusiveVoucher("");
      reloadVoucer(setFilteredList);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: "Error",
      });
      console.log(error);
    }
  };
  const deleteItem = async (id) => {
    const confirmResult = await Swal.fire({
      text: "You want to delete?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });
    if (!confirmResult.isConfirmed) {
      return;
    }
    try {
      await deleteVoucher(accessToken, id);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      reloadVoucer(setFilteredList);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteManyItem = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: "warning",
        text: "Please select items to delete",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      text: "You want to delete selected items?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          await deleteVoucher(accessToken, id);
        })
      );

      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      setSelected(false);
      setSelectedIds([]);
      setSelectAll(false);
      reloadVoucer(setFilteredList);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpiredVouchers = async () => {
    for (const cop of voucherData) {
      if (formatVocher(cop.expiry) < now) {
        await deleteVoucher(accessToken, cop._id);
        reloadVoucer(setFilteredList);
      }
    }
  };

  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = filteredList.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Vouchers maincontainer section" id="Vouchers">
      <div className="vouchers__container">
        <h2 className="section_title">Quản lý mã giảm giá</h2>

        <div className="action__from">
          <Box
            sx={{
              "& > :not(style)": { m: 2, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              sx={{ flexGrow: 1 }}
            />
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab color="primary" aria-label="add" onClick={handleOpenDialog}>
              <AddIcon />
            </Fab>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={deleteExpiredVouchers}
            >
              <ReplayIcon />
            </Fab>
          </Box>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {selectedIds.length >= 2 && (
              <Fab
                color="primary"
                aria-label="delete"
                onClick={() => deleteManyItem()}
              >
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        </div>

        <AddForm
          open={openDialog}
          handleClose={handleCloseDialog}
          accessToken={accessToken}
          voucherData={voucherData}
          handleSubmit={handleSubmit}
        />

        <List
          current={current}
          selectAll={selectAll}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          deleteItem={deleteItem}
          formatVocher={formatVocher}
        />
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(voucherData.length / PerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Voucher;
