"use client";
import React, { useEffect, useState } from "react";
import "../../../../Styles/user/ThongTinNguoiDung.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import CustomSnackbar from "@/component/Snakbar/CustomSnackbar";
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";
import { apiUrlUser } from "@/services/config";

export const ThongTin = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ngay, setNgay] = useState("");
  const [thang, setThang] = useState("");
  const [nam, setNam] = useState("");
  const [isFieldsEnabled, setIsFieldsEnabled] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageServerity, setMessageServerity] = useState("");
  const [idUser, setIdUser] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserCurrent(accessToken);
        setIdUser(res._id);
        setUsername(res.username);
        setEmail(res.email);
        setPhoneNumber(res.phoneNumber);
        const rawDate = res.Date;
        const dateObject = new Date(rawDate);
        setNgay(dateObject.getUTCDate());
        setThang(dateObject.getUTCMonth() + 1);
        setNam(dateObject.getUTCFullYear());
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, dispatch]);

  const handleOpenSnackbar = (message, severity) => {
    setMessage(message);
    setMessageServerity(severity);
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);
    formData.append("Date", new Date(`${nam}-${thang}-${ngay}`));
    try {
      await axios.put(`${apiUrlUser}/update/${idUser}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${accessToken}`,
        },
      });
      handleOpenSnackbar("CẬP NHẬT THÔNG TIN THÀNH CÔNG", "info");
    } catch (error) {
      console.error("Error while calling API:", error);
    } finally {
      setIsSaving(false);
      setIsEditMode(false);
      setIsFieldsEnabled(false);
    }
  };

  const handleToggleFields = () => {
    setIsEditMode(!isEditMode);
    setIsFieldsEnabled(!isFieldsEnabled);
  };

  return (
    <div className="content-infor">
      <div className="info-field">
        <span>Họ và tên:</span>
        <div className="input-field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={!isFieldsEnabled}
          />
        </div>
      </div>
      <div className="info-field">
        <span>Email:</span>
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isFieldsEnabled}
          />
        </div>
      </div>
      <div className="info-field">
        <span>Ngày sinh:</span>
        <div className="select-field">
          <select
            disabled={!isFieldsEnabled}
            value={ngay}
            onChange={(e) => setNgay(e.target.value)}
          >
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="info-field">
        <span>Tháng sinh:</span>
        <div className="select-field">
          <select
            disabled={!isFieldsEnabled}
            value={thang}
            onChange={(e) => setThang(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="info-field">
        <span>Năm sinh:</span>
        <div className="select-field">
          <select
            disabled={!isFieldsEnabled}
            value={nam}
            onChange={(e) => setNam(e.target.value)}
          >
            {Array.from(
              { length: 70 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="info-field">
        <span>Số điện thoại:</span>
        <div className="input-field">
          <input
            disabled={!isFieldsEnabled}
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      </div>
      <div className="btn-infor">
        <button
          className={`btn-${isEditMode ? "cancel" : "change"}`}
          onClick={handleToggleFields}
        >
          {isEditMode ? "Hủy" : "Thay Đổi"}
        </button>
        {isEditMode && (
          <button className="btn-save" onClick={handleSaveChanges}>
            {isSaving ? "Đang lưu......" : "Lưu Thay Đổi"}
          </button>
        )}
      </div>
      <CustomSnackbar
        open={openSnackBar}
        handleClose={handleCloseSnackbar}
        message={message}
        severity={messageServerity}
      />
    </div>
  );
};
