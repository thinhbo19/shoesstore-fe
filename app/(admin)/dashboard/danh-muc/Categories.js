"use client";
import "../AdminScreen.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import List from "./List";
import AddForm from "./AddForm";
import {
  deleteCategory,
  postCategory,
  putCategory,
  reloadCate,
} from "@/services/Redux/handle/hanldeCategory";
import EditForm from "./EditForm";

const Categories = ({ cateData }) => {
  const accessToken = useSelector(selectAccessToken);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const handleOpenDialogEdit = (id) => {
    setOpenDialogEdit(true);
    setSelected(id);
  };
  const handleCloseDialogEdit = () => setOpenDialogEdit(false);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(cateData);
    } else {
      const filteredBreeds = cateData.filter((cate) =>
        cate.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filteredBreeds);
    }
  }, [searchTerm, cateData]);

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
  const handleSubmit = async (categoryName, setCategoryName) => {
    try {
      const res = await postCategory(accessToken, categoryName);
      Swal.fire({
        icon: "success",
        text: "Add successfully",
      });
      setCategoryName("");
      reloadCate(setFilteredList);
    } catch (error) {
      Swal.fire({
        icon: "warning",
        text: error.response.data.mes,
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
      await deleteCategory(accessToken, id);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      reloadCate(setFilteredList);
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
          await deleteCategory(accessToken, id);
        })
      );

      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      setSelected(false);
      setSelectedIds([]);
      setSelectAll(false);
      reloadCate(setFilteredList);
    } catch (error) {
      console.log(error);
    }
  };
  const hanleEdit = async (categoryName, setCateName) => {
    try {
      await putCategory(accessToken, categoryName, selected._id);
      Swal.fire({
        icon: "success",
        text: "Updated successfully",
      });
      setCateName("");
      reloadCate(setFilteredList);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Failed to update",
      });
    }
  };

  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = filteredList.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Categories maincontainer section" id="Categories">
      <div className="categories__container">
        <h2 className="section_title">Quản lý danh mục</h2>
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
          cateData={cateData}
          handleSubmit={handleSubmit}
        />

        <EditForm
          openEdit={openDialogEdit}
          handleCloseEdit={handleCloseDialogEdit}
          hanleEdit={hanleEdit}
        />

        <List
          current={current}
          selectAll={selectAll}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          handleOpenDialogEdit={handleOpenDialogEdit}
          deleteItem={deleteItem}
        />

        <div className="pagination">
          {Array.from({
            length: Math.ceil(cateData.length / PerPage),
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
      </div>
    </section>
  );
};

export default Categories;
