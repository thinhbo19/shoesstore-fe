import React, { useState } from "react";
import axios from "axios";
import "../../Styles/login/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Loading from "@/component/Loading/Loading";
import {
  setAccessToken,
  setAdmin,
  setLogin,
  setUID,
} from "@/services/Redux/user/useSlice";
import { useDispatch } from "react-redux";
import { apiUrlUser } from "@/services/config";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const Swal = require("sweetalert2");
  const router = useRouter();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrlUser}/login`, formData);
      const user = response.data.user;
      const accessToken = response.data.accessToken;
      dispatch(setAccessToken(accessToken));
      dispatch(setAdmin(user.role));
      dispatch(setLogin(true));
      dispatch(setUID(user._id));
      if (user.role === "Admin") {
        router.push("/dashboard");
      }
      if (user.role === "Staff") {
        router.push("/customer-servicer");
      }
      if (user.role === "User") {
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      if (error.response.status === 400) {
        Swal.fire({
          icon: "warning",
          title: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "warning",
          title:
            "Đăng nhập không thành công. Vui lòng kiểm tra tên đăng nhập và mật khẩu",
        });
      }
    }
  };

  const toggleWrapperAdd = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.add("active");
  };

  const toggleWrapperAddForgotPass = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.add("active-forgotpass");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Box
        maxWidth="100%"
        sx={{
          width: "60%",
          height: "100%",
        }}
        className="form-box login"
      >
        <h2>ĐĂNG NHẬP</h2>
        <form onSubmit={handleLogin}>
          <div className="input-box">
            <span className="icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-box">
            <span className="icon" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <label htmlFor="password">Mật khẩu</label>
          </div>

          <div className="remember-forgot">
            <label>
              <input type="checkbox" /> Ghi nhớ tài khoản
            </label>
            <button
              type="button"
              className="forgot-pass"
              onClick={toggleWrapperAddForgotPass}
            >
              Bạn quên mật khẩu?
            </button>
          </div>
          <button type="submit" name="login" className="Btn">
            ĐĂNG NHẬP
          </button>

          <div className="login-register">
            <p>
              Bạn chưa có tài khoản?{" "}
              <button
                type="button"
                className="register-link"
                onClick={toggleWrapperAdd}
              >
                ĐĂNG KÝ{"   "}{" "}
              </button>
            </p>
          </div>

          <div className="signInwith">
            <div className="signInwithGoogle">
              <span className="icon-SignIn">
                <FontAwesomeIcon icon={faGoogle} />
              </span>
              <p>Đăng nhập với Google</p>
            </div>
            <h5> - HOẶC - </h5>
            <div className="signInwithGitHub">
              <span className="icon-SignIn">
                <FontAwesomeIcon icon={faFacebook} />
              </span>
              <p>Đăng nhập với Facebook</p>
            </div>
          </div>
        </form>
      </Box>
    </>
  );
};

export default Login;
