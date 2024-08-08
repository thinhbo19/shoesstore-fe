"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../../Styles/user/HoaDon.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";
import List from "./List";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { apiUrlOrder } from "@/services/config";
import { deleteOrder } from "@/services/Redux/handle/hanldeOrder";

const returnValue = (status) => {
  switch (status) {
    case "Processing":
      return "Đang xử lý";
    case "Shipping":
      return "Đang vận chuyển";
    case "Success":
      return "Thành công";
    case "Cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

const hanldePaymentMethod = (paymentMethod) => {
  switch (paymentMethod) {
    case "PayPal":
      return "PayPal";
    case "ZaloPay":
      return "ZaloPay";
    case "PaymentDelivery":
      return "COD";
    default:
      return paymentMethod;
  }
};

const updateOrders = (ordersData, userArr) => {
  return ordersData.map((order) => {
    const correspondingUser = userArr.find(
      (user) => user._id === order.OrderBy
    );
    if (correspondingUser) {
      return {
        ...order,
        username: correspondingUser.username,
      };
    }
    return order;
  });
};

const HoaDon = ({ orderArrAll }) => {
  const [hoaDonData, setHoaDonData] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [PerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Processing");

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const fetchData = async () => {
    try {
      const userArr = await getAllUsers();

      const ordersData = orderArrAll.filter(
        (order) => order.status === selectedOption
      );

      const updatedOrders = updateOrders(ordersData, userArr);

      setHoaDonData([...updatedOrders].reverse());
    } catch (error) {
      console.error("Có lỗi xảy ra khi lấy đơn hàng:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken, selectedOption, hoaDonData]);

  const hanleSetShipping = async (oid) => {
    try {
      const result = await Swal.fire({
        title: "Xác nhận",
        text: "Bạn có chắc chắn muốn xác nhận đơn hàng này?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#7f7ffa",
        cancelButtonColor: "#ed4956",
        confirmButtonText: "Xác nhận",
      });

      if (result.isConfirmed) {
        await axios.put(
          `${apiUrlOrder}/status/${oid}`,
          { status: "Shipping" },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        Swal.fire("Đã xác nhận đơn hàng!", "", "success");
        fetchData();
      }
    } catch (error) {
      console.error("Error while updating order status:", error);
    }
  };

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
      await deleteOrder(accessToken, id);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      reloadCate(setFilteredList);
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * PerPage;
  const endIndex = startIndex + PerPage;
  const currentOrders = hoaDonData.slice(startIndex, endIndex);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Categories maincontainer section" id="Categories">
      <div className="categories__container">
        <h2 className="section_title">Quản lý hóa đơn</h2>
        <div className="action__from">
          <Box sx={{ "& > :not(style)": { m: 1, minWidth: 120 } }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Option</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedOption}
                label="Option"
                onChange={handleSelectChange}
              >
                <MenuItem value="Processing">Đang xử lý</MenuItem>
                <MenuItem value="Shipping">Đang vận chuyển</MenuItem>
                <MenuItem value="Success">Thành công</MenuItem>
                <MenuItem value="Cancelled">Đã hủy</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {selectedIds.length >= 2 && (
              <Fab
                color="primary"
                aria-label="delete"
                // onClick={() => deleteManyItem()}
              >
                <DeleteIcon />
              </Fab>
            )}
          </Box>
        </div>

        <List
          currentOrders={currentOrders}
          selectAll={selectAll}
          handleSelect={handleSelect}
          handleSelectAll={handleSelectAll}
          deleteItem={deleteItem}
          returnValue={returnValue}
          selectedOption={selectedOption}
          hanldePaymentMethod={hanldePaymentMethod}
          hanleSetShipping={hanleSetShipping}
        />

        <div className="pagination">
          {Array.from({
            length: Math.ceil(hoaDonData.length / PerPage),
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

export default HoaDon;
