import React, { useState, useEffect } from "react";
import "../../Styles/login/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faEye,
  faEyeSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Box, TextField } from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { apiUrlUser } from "@/services/config";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Signup = () => {
  const [open, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageServerity, setMessageServerity] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  const toggleWrapperRemove = () => {
    const wrapper = document.querySelector(".wrapper");
    if (wrapper) {
      wrapper.classList.remove("active");
    }
  };

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formatPhoneNumber = (number) => {
    if (number.startsWith("0")) {
      return `+84${number.substring(1)}`;
    }
    return number;
  };

  const configureRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            sendOtp();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const sendOtp = async () => {
    configureRecaptcha();
    try {
      const appVerifier = window.recaptchaVerifier;
      const formatPhone = formatPhoneNumber(phoneNumber);
      signInWithPhoneNumber(auth, formatPhone, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Error during OTP send:", error);
    }
  };

  const fetchUserData = async (event) => {
    event.preventDefault();

    if (
      email === "" ||
      username === "" ||
      password === "" ||
      phoneNumber === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng nhập đầy đủ các thông tin",
      });
      return;
    }

    setIsSigningUp(true);
    const userDataToSend = {
      username: username,
      phoneNumber: phoneNumber,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${apiUrlUser}/register`,
        userDataToSend
      );
      if (response.data) {
        Swal.fire({
          icon: "success",
          title:
            "Đăng ký thành công. Vui lòng kiểm tra email để kích hoạt tài khoản.",
        });
        sendOtp();
        // await createChat();
        // clearFields();
        // toggleWrapperRemove();
        // router.push(`/dang-nhap/verify-otp/${response.data.CreateUser._id}`);
      } else {
        setMessage("Email hoặc tên đăng nhập đã được sử dụng");
        setMessageServerity("error");
        handleClick();
      }
    } catch (error) {
      setMessage("Email hoặc tên đăng nhập đã được sử dụng");
      setMessageServerity("error");
      handleClick();
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <>
      <Box
        maxWidth="100%"
        sx={{
          width: "60%",
          height: "100%",
        }}
        className="form-box signup"
      >
        <div id="recaptcha-container"></div>
        <h2>TẠO TÀI KHOẢN</h2>
        <div className="from__register">
          <div className="input__register__field">
            <FontAwesomeIcon className="icon" icon={faUser} />
            <TextField
              className="input__register"
              type="text"
              name="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Nhập họ tên của bạn"
            />
          </div>
          <div className="input__register__field">
            <FontAwesomeIcon className="icon" icon={faPhone} />
            <TextField
              className="input__register"
              type="text"
              name="mobile"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              label="Nhập số điện thoại của bạn"
            />
          </div>
          <div className="input__register__field">
            <FontAwesomeIcon className="icon" icon={faEnvelope} />
            <TextField
              className="input__register"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Nhập email của bạn"
            />
          </div>
          <div className="input__register__field">
            <FontAwesomeIcon
              onClick={togglePasswordVisibility}
              className="icon"
              icon={showPassword ? faEyeSlash : faEye}
            />
            <TextField
              className="input__register"
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Nhập mật khẩu của bạn"
            />
          </div>
          <button
            type="submit"
            name="signup"
            className="Btn"
            disabled={isSigningUp}
            onClick={(e) => fetchUserData(e)}
          >
            {isSigningUp ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
          </button>

          <div className="register-register">
            <p>
              Bạn chưa có tài khoản?{" "}
              <button
                type="button"
                className="register-link"
                onClick={toggleWrapperRemove}
              >
                ĐĂNG NHẬP
              </button>
            </p>
          </div>
        </div>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageServerity}
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
    </>
  );
};

export default Signup;
