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
import Swal from "sweetalert2";
import OtpInput from "react-otp-input";
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Loading from "@/component/Loading/Loading";
import { createChat } from "@/services/Redux/handle/handleChat";

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
  const [OTP, setOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNextStep1 = () => {
    setStep(1);
  };

  const handleNextStep2 = () => {
    if (email && username && password) {
      setStep(2);
    } else {
      Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
    }
  };

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
    if (email && username && password && phoneNumber) {
      configureRecaptcha();
      try {
        const appVerifier = window.recaptchaVerifier;
        const formatPhone = formatPhoneNumber(phoneNumber);
        signInWithPhoneNumber(auth, formatPhone, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setStep(3);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.error("Error during OTP send:", error);
      }
    } else {
      Swal.fire("Lỗi", "Vui lòng nhập đầy đủ thông tin", "error");
    }
  };

  const verifyOTP = async () => {
    setLoading(true);
    try {
      const confirmationResult = window.confirmationResult;
      const result = await confirmationResult.confirm(OTP);
      if (result.user) {
        await fetchUserData();
        await createChat();
        toggleWrapperRemove();
        clearFields();
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      Swal.fire("Lỗi", "Mã OTP không chính xác, vui lòng thử lại", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserData = async () => {
    const userDataToSend = { username, phoneNumber, email, password };

    try {
      const response = await axios.post(
        `${apiUrlUser}/register`,
        userDataToSend
      );
      if (response.data) {
        Swal.fire("Thành công", "Đăng ký thành công.", "success");
      } else {
        setMessage("Email hoặc tên đăng nhập đã được sử dụng");
        setMessageServerity("error");
        setOpenSnackbar(true);
        setStep(1);
        setOTP("");
      }
    } catch (error) {
      setMessage("Email hoặc tên đăng nhập đã được sử dụng");
      setMessageServerity("error");
      setOpenSnackbar(true);
    }
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
        className="form-box signup"
      >
        <div id="recaptcha-container"></div>
        <h2>TẠO TÀI KHOẢN</h2>
        <div className="from__register">
          {step === 1 && (
            <>
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
                onClick={() => handleNextStep2()}
              >
                TIẾP TỤC
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
            </>
          )}
          {step === 2 && (
            <>
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

              <button
                type="submit"
                name="signup"
                className="Btn"
                onClick={() => sendOtp()}
              >
                {loading ? "ĐANG GỬI....." : "GỬI OTP"}
              </button>

              <div className="register-register">
                <p>
                  Trở về?
                  <button
                    type="button"
                    className="register-link"
                    onClick={handleNextStep1}
                  >
                    back
                  </button>
                </p>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="input__register__field">
                <p>NHẬP OTP MÀ BẠN ĐÃ NHẬN</p>
                <OtpInput
                  value={OTP}
                  onChange={setOTP}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      style={{
                        width: "35px",
                        height: "35px",
                        fontSize: "1.5rem",
                        margin: "0 5px",
                        textAlign: "center",
                        borderRadius: "8px",
                        border: "2px solid #ccc",
                      }}
                    />
                  )}
                />
              </div>

              <button
                type="submit"
                name="signup"
                className="Btn"
                onClick={() => verifyOTP()}
              >
                ĐĂNG KÝ
              </button>
            </>
          )}
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
