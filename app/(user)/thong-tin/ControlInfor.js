"use client";
import React, { useState, useEffect } from "react";
import "../../../Styles/user/ThongTinNguoiDung.css";
import Loading from "../../../component/Loading/Loading";
import "./ControlInfor.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LockIcon from "@mui/icons-material/Lock";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomSnackbar from "../../../component/Snakbar/CustomSnackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { usePathname } from "next/navigation";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import Link from "next/link";
import { apiUrlUser } from "@/services/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

const ControlInfor = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [Avatar, setNewAvartar] = useState(null);
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageServerity, setMessageServerity] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrlUser}/current`, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
        setNewAvartar(res.data.user.Avatar);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken, dispatch]);

  const handleAvatarChange = async (e) => {
    setIsSaving(true);
    setOpenBackdrop(true);

    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("Avatar", file);

      try {
        const response = await axios.put(`${apiUrlUser}/update/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${accessToken}`,
          },
        });

        setNewAvartar(response.data.user.Avatar);
        handleOpenSnackbar("CẬP NHẬT ẢNH ĐẠI DIỆN THÀNH CÔNG", "info");
      } catch (error) {
        console.error("Error while calling API:", error);
      } finally {
        setIsSaving(false);
        setOpenBackdrop(false);
      }
    } else setOpenBackdrop(false);
  };

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [pathname.pathname]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="control-infor">
      <div className="avatar-user">
        <img src={Avatar} alt="" onClick={handleOpen} />
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          style={{ display: "none" }}
          id="avatar-upload"
        />
        <label htmlFor="avatar-upload" className="btn-change-img">
          {isSaving ? "Đang thay đổi..." : "Thay đổi ảnh đại diện"}
        </label>
      </div>
      <div className="btn-control-content">
        <Link
          className={
            pathname === "/thong-tin/profile"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/profile"
        >
          <AccountCircleIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Hồ Sơ Của Tôi</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/dia-chi"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/dia-chi"
        >
          <LocationOnIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Địa Chỉ</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/lich-su-mua-hang"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/lich-su-mua-hang"
        >
          <HistoryIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Lịch Sử Mua Hàng</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/voucher"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/voucher"
        >
          <ConfirmationNumberIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Kho Voucher</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/thong-bao"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/thong-bao"
        >
          <CircleNotificationsIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Thông Báo</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/yeu-thich"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/yeu-thich"
        >
          <FavoriteIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Sản Phẩm Yêu Thích</p>
        </Link>
        <Link
          className={
            pathname === "/thong-tin/doi-mat-khau"
              ? "btnControl active"
              : "btnControl"
          }
          href="/thong-tin/doi-mat-khau"
        >
          <LockIcon sx={{ fontSize: 35, color: "#ee4d2d" }} />
          <p>Đổi Mật Khẩu</p>
        </Link>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="avatar-modal">
          <img src={Avatar} alt="" />
        </Box>
      </Modal>
      <CustomSnackbar
        open={openSnackBar}
        handleClose={handleCloseSnackbar}
        message={message}
        severity={messageServerity}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ControlInfor;
