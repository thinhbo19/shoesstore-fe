"use client";
import React, { useState } from "react";
import "../../Styles/login/reset.css";
import "../../Styles/login/Form.css";
import { Box, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/component/Loading/Loading";
import { apiUrlUser } from "@/services/config";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const ResetPass = () => {
  const [password, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [open, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSeverity, setMessageSeverity] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`${apiUrlUser}/resetpassword`, {
        password,
        token,
      });

      router.push("/dang-nhap");
      setMessage("Đã thay đổi mật khẩu thành công.");
      setMessageSeverity("success");
      handleClick();
    } catch (error) {
      console.log(error);
      setMessage("Có lỗi xảy ra khi đặt lại mật khẩu. Vui lòng thử lại.");
      setMessageSeverity("error");
      handleClick();
    } finally {
      setLoading(false);
      setNewPassword("");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mainReset">
      <div className="imageBack">
        <Box
          className="form-box forgotpass"
          maxWidth="100%"
          sx={{
            width: "60%",
            height: "50%",
          }}
        >
          <h2>THAY ĐỔI MẬT KHẨU</h2>
          <div className="from__forgotpass">
            <div className="input__forgotpass__field">
              <FontAwesomeIcon className="icon" icon={faEye} />
              <TextField
                type="password"
                name="newPassword"
                className="input__forgotpass"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                label="Nhập mật khẩu mới của bạn"
              />
            </div>
            <div className="input__forgotpass__field">
              <TextField
                type="text"
                className="input__forgotpass"
                name="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                label="Nhập Token mà bạn đã nhận"
              />
            </div>
            <button onClick={handleSubmit} type="submit" className="Btn">
              Xác Nhận
            </button>
          </div>
        </Box>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageSeverity}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5rem",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPass;
