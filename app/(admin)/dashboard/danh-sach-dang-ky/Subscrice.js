"use client";
import { useSelector } from "react-redux";
import "../AdminScreen.css";
import React, { useEffect, useState } from "react";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeleteIcon from "@mui/icons-material/Delete";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mui/material";
import Loading from "@/component/Loading/Loading";

const Subscribe = () => {
  const accessToken = useSelector(selectAccessToken);
  const [subscribersData, setSubscribers] = useState([]);
  const [PerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmail, setSelectedEmail] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const Swal = require("sweetalert2");

  useEffect(() => {
    if (accessToken) {
      fetchGET();
    }
  }, [accessToken]);

  const fetchGET = async () => {
    try {
      const response = await fetch("/api/email", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectEmail = (event) => {
    const email = event.target.getAttribute("data-email");
    const isChecked = event.target.checked;
    let newSelectedEmails = [...selectedEmail];

    if (isChecked) {
      newSelectedEmails.push(email);
    } else {
      newSelectedEmails = newSelectedEmails.filter(
        (selectedEmail) => selectedEmail !== email
      );
    }
    setSelectedEmail(newSelectedEmails);
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
      ids.push(checkbox.getAttribute("data-email"));
    });
    setSelectedEmail(isChecked ? ids : []);
  };

  const handleExport = async () => {
    try {
      const response = await fetch("/api/exportSub", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "subscribers.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting subscribers:", error);
    }
  };

  const handlePUT = async (email) => {
    setLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "Unsubscribe thành công",
        });
        fetchGET();
      } else {
        console.error("Error unsubscribing:", await response.json());
      }
    } catch (error) {
      console.error("Error unsubscribing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    const confirmResult = await Swal.fire({
      text: "Bạn muốn hủy đăng ký những người dùng này?",
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
        selectedEmail.map(async (email) => {
          await fetch("/api/email", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          });
        })
      );
      Swal.fire({
        icon: "success",
        text: "Thành công",
      });
      fetchGET();
    } catch (error) {
      console.log(error);
    }
  };

  const indexOfLast = currentPage * PerPage;
  const indexOfFirst = indexOfLast - PerPage;
  const current = subscribersData.slice(indexOfFirst, indexOfLast);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="Categories maincontainer section" id="Categories">
      <div className="categories__container">
        <h2 className="section_title">Danh Sách Subscribe</h2>
        <div className="action__from">
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            {selectedEmail.length >= 2 && (
              <Fab color="primary" aria-label="delete">
                <DeleteIcon onClick={handleDeleteAll} />
              </Fab>
            )}

            <Button
              startIcon={<SystemUpdateAltIcon />}
              variant="contained"
              className="btn_export"
              onClick={handleExport}
            >
              Export
            </Button>
          </Box>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {current.map(
              (sub, index) =>
                sub.source !== "Admin Add" && (
                  <tr key={sub.id}>
                    <td>
                      <input
                        type="checkbox"
                        data-email={sub.email_address}
                        onChange={handleSelectEmail}
                      />
                    </td>
                    <td>{index}</td>
                    <td>{sub.email_address}</td>
                    <td>
                      <FontAwesomeIcon
                        className="admin__icon"
                        icon={faTrash}
                        onClick={() => handlePUT(sub)}
                      />
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {Array.from({
          length: Math.ceil(subscribersData.length / PerPage),
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

export default Subscribe;
