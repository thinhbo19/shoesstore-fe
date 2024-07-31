"use client";
import React, { useState } from "react";
import "../../Styles/login/reset.css";
import "../../Styles/login/Form.css";
import { Box, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useRouter } from "next/navigation";
import Loading from "@/component/Loading/Loading";
import OtpInput from "react-otp-input";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const VerifyOTP = ({ userId }) => {
  const [OTP, setOTP] = useState("");
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
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mainReset">
      <div id="recaptcha-container"></div>
      <div className="imageBack">
        <Box
          className="form-box forgotpass"
          maxWidth="100%"
          sx={{
            width: "60%",
            height: "50%",
          }}
        >
          <h2>KÍCH HOẠT TÀI KHOẢN</h2>
          <div className="from__forgotpass">
            <div className="input__forgotpass__field">
              <OtpInput
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                className="input__forgotpass"
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props} />}
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

export default VerifyOTP;
