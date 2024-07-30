// ForgotPass.js
import React, { useState } from "react";
import "../../Styles/login/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { apiUrlUser } from "@/services/config";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const Swal = require("sweetalert2");

  const toggleWrapperRemoveForgotPass = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.remove("active-forgotpass");
  };

  const toggleWrapperAddForgotPass = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.add("active");
    wrapper.classList.remove("active-forgotpass");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await axios.post(`${apiUrlUser}/forgotPassword?email=${email}`);
      Swal.fire({
        icon: "success",
        title: "Yêu cầu đã được gửi thành công! Hãy kiểm tra lại email của bạn",
      });
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu đặt lại mật khẩu:", error);
      Swal.fire({
        icon: "error",
        title: "Bạn đã nhập sai email hoặc do email chưa đăng ký",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Box
        className="form-box forgotpass"
        maxWidth="100%"
        sx={{
          width: "60%",
          height: "60%",
        }}
      >
        <h2>QUÊN MẬT KHẨU</h2>
        <div className="from__forgotpass">
          <div className="input__forgotpass__field">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <TextField
              type="email"
              className="input__forgotpass"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Nhập email của bạn"
              required
            />
          </div>
          <button
            type="submit"
            className="Btn"
            disabled={saving}
            onClick={handleSubmit}
          >
            {saving ? "ĐANG GỬI..." : "XÁC NHẬN"}
          </button>
          <div className="login-forgotpass">
            <p
              className="forgotpass-link"
              onClick={toggleWrapperRemoveForgotPass}
            >
              Đăng Nhập
            </p>
            <p className="forgotpass-link" onClick={toggleWrapperAddForgotPass}>
              Tạo Tài Khoản
            </p>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ForgotPass;
