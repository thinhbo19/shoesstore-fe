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
import { Box, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Loading from "@/component/Loading/Loading";
import {
  setAccessToken,
  setAdmin,
  setCartList,
  setFavorites,
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
      dispatch(setFavorites(user.Favorites));
      dispatch(setCartList(user.Cart));
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
        <div className="from__login">
          <div className="input__login__field">
            <FontAwesomeIcon className="icon_email" icon={faEnvelope} />
            <TextField
              className="input__login"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              label="Nhập email của bạn"
              variant="filled"
            />
          </div>

          <div className="input__login__field">
            <FontAwesomeIcon
              className="icon_pass"
              icon={showPassword ? faEyeSlash : faEye}
              onClick={togglePasswordVisibility}
            />
            <TextField
              className="input__login"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              required
              label="Nhập mật khẩu của bạn"
              variant="filled"
            />
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

          <button
            onClick={handleLogin}
            type="submit"
            name="login"
            className="Btn"
          >
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
        </div>
      </Box>
    </>
  );
};

export default Login;
