// ForgotPass.js
import React, { useState } from "react";
import "../../Styles/login/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { Box, Button } from "@mui/material";
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
      <Box className="form-box forgotpass">
        <h2>QUÊN MẬT KHẨU</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box-forgotpass">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="btnOTP">
            <button type="submit" className="Btn-otp" disabled={saving}>
              {saving ? "ĐANG GỬI..." : "XÁC NHẬN"}
            </button>
          </div>
          <div className="login-forgotpass">
            <p>
              <Button
                className="forgotpass-link"
                onClick={toggleWrapperRemoveForgotPass}
              >
                {" "}
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                ></FontAwesomeIcon>{" "}
                Đăng Nhập
              </Button>
            </p>
            <p>
              <Button
                className="forgotpass-link"
                onClick={toggleWrapperAddForgotPass}
              >
                Tạo Tài Khoản{" "}
                <FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon>{" "}
              </Button>
            </p>
          </div>
        </form>
      </Box>
    </>
  );
};

export default ForgotPass;
