"use client";
import "./Users.css";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import List from "./List";
import {
  deleteUser,
  patchChangeRole,
  patchIsBlockedUser,
  reloadUser,
} from "@/services/Redux/handle/hanldeUser";
import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";
import { deleteChat, findChat } from "@/services/Redux/handle/handleChat";

const UsersList = () => {
  const accessToken = useSelector(selectAccessToken);
  const [userList, setUserList] = useState([]);
  const [PerPage] = useState(5);
  const Swal = require("sweetalert2");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filteredUserList, setFilteredUserList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUserList(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [accessToken]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredUserList(userList);
    } else {
      const filteredUsers = userList.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUserList(filteredUsers);
    }
  }, [searchTerm, userList]);

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

  const handleChangeIsBlocked = async (userId, currentStatus) => {
    if (!accessToken) {
      console.error("No access token available");
      return;
    }
    try {
      await patchIsBlockedUser(accessToken, userId, currentStatus);
      const updatedUserList = userList.map((user) =>
        user._id === userId ? { ...user, isBlocked: !currentStatus } : user
      );
      setUserList(updatedUserList);
      reloadUser(setFilteredUserList);
      Swal.fire("Success", "User status updated successfully", "success");
    } catch (error) {
      console.error("Error updating user status:", error);
      Swal.fire("Error", "Failed to update user status", "error");
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await patchChangeRole(accessToken, userId, newRole);
      reloadUser(setFilteredUserList);
      Swal.fire("Success", "Change role user successfully", "success");
    } catch (error) {
      console.error("Error updating user role:", error);
      Swal.fire("Error", "Failed to update user role", "error");
    }
  };

  const deleteItem = async (uid) => {
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
      await deleteUser(accessToken, uid);
      const chatData = await findChat(uid);
      await Promise.all(
        chatData.map(async (chat) => {
          await deleteChat(chat._id);
        })
      );
      reloadUser(setFilteredUserList);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
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
        selectedIds.map(async (uid) => {
          await deleteItem(accessToken, uid);
        })
      );
      reloadUser(setFilteredUserList);
      Swal.fire({
        icon: "success",
        text: "Delete successfully",
      });
      setSelectedIds([]);
      setSelectAll(false);
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLastSpecies = currentPage * PerPage;
  const indexOfFirstSpecies = indexOfLastSpecies - PerPage;
  const current = filteredUserList.slice(
    indexOfFirstSpecies,
    indexOfLastSpecies
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="Users maincontainer section" id="Users">
      <div className="Users__container grip">
        <h2 className="section_title">Users</h2>
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
            {selectedIds.length >= 2 && (
              <Fab color="primary" aria-label="delete">
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
          handleChangeRole={handleChangeRole}
          handleChangeIsBlocked={handleChangeIsBlocked}
        />

        <div className="pagination">
          {Array.from({
            length: Math.ceil(userList.length / PerPage),
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

export default UsersList;
