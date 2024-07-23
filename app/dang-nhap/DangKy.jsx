import React, { useState } from "react";
import "../../Styles/login/Form.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faEye,
  faEyeSlash,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Box } from "@mui/material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { createChat } from "@/services/Redux/handle/handleChat";
import { apiUrlUser } from "@/services/config";

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
  const Swal = require("sweetalert2");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const toggleWrapperRemove = () => {
    const wrapper = document.querySelector(".wrapper");
    wrapper.classList.remove("active");
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

  const fetchUserData = async (event) => {
    event.preventDefault();
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
          title: "Bạn đã đăng ký tài khoản thành công",
        });
        await createChat();
        clearFields();
        toggleWrapperRemove();
      } else {
        setMessage("Email hoặt tên đăng nhập đã được sử dụng");
        setMessageServerity("error");
        handleClick();
      }
    } catch (error) {
      setMessage("Email hoặt tên đăng nhập đã được sử dụng");
      setMessageServerity("error");
      handleClick();
    } finally {
      setIsSigningUp(false);
    }
  };

  return <>ád</>;
};

export default Signup;
