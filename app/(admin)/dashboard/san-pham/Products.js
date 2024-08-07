"use client";
import "../AdminScreen.css";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import List from "./List";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  reloadProduct,
} from "@/services/Redux/handle/hanldeProduct";

const Products = ({ cateData, brandData, productList }) => {
  const accessToken = useSelector(selectAccessToken);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!searchTerm) {
      setFilteredList(productList);
    } else {
      const filtered = productList.filter((prod) =>
        prod.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchTerm, productList]);

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
      await deleteProduct(accessToken, id);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      reloadProduct(setFilteredList);
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
          await deleteProduct(accessToken, id);
        })
      );

      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      setSelectedIds([]);
      setSelectAll(false);
      reloadProduct(setFilteredList);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandName = (_id) => {
    const brand = brandData.find((Brands) => Brands._id === _id);
    return brand ? brand.brandName : "Không xác định";
  };
  const getCategoryName = (_id) => {
    const cate = cateData.find((Cate) => Cate._id === _id);
    return cate ? cate.categoryName : "Không xác định";
  };

  const handleAddformPage = () => {
    router.push(`/dashboard/san-pham/them-san-pham`);
  };
  const handleEditformPage = (id) => {
    router.push(`/dashboard/san-pham/${id}`);
  };
  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = filteredList.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Categories maincontainer section" id="Categories">
      <div className="categories__container ">
        <h2 className="section_title">Quản lý sản phẩm</h2>
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
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => handleAddformPage()}
            >
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

        <List
          current={current}
          selectAll={selectAll}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          deleteItem={deleteItem}
          getBrandName={getBrandName}
          getCategoryName={getCategoryName}
          handleEditformPage={handleEditformPage}
        />

        <div className="pagination">
          {Array.from({
            length: Math.ceil(productList.length / PerPage),
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

export default Products;
