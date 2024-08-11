import React, { useState } from "react";
import "../../Styles/PopupMailChimp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import PopImg from "../../assets/popimg.png";
import { Button, TextField } from "@mui/material";
import Loading from "../Loading/Loading";

const PopupMailChimp = ({ handlePopup }) => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const Swal = require("sweetalert2");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, full_name: fullName }),
      });
      console.log(response);
      if (response.ok) {
        Swal.fire({
          icon: "success",
          text: "Đăng ký thành công!",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: "Có lỗi!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Có lỗi!",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="PopupMailChimp__container">
      {!loading && (
        <div className="popup__wrapper">
          <FontAwesomeIcon
            className="icon__popup"
            icon={faX}
            onClick={handlePopup}
          />
          <div className="PopupMailChimp__img">
            <Image src={PopImg} alt="popimg" className="imgpop" />
          </div>
          <div className="PopupMailChimp__form">
            <p className="popup__title">Subscribe</p>
            <p className="popup__text">
              Đăng ký để nhận được nhiều thông tin ưu đãi
            </p>
            <TextField
              className="text__popup"
              id="filled-basic"
              label="Email của bạn"
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                "& > :not(style)": { m: 1 },
              }}
            />
            <TextField
              className="text__popup"
              id="filled-basic"
              label="Họ tên"
              variant="filled"
              onChange={(e) => setFullName(e.target.value)}
              sx={{
                "& > :not(style)": { m: 1 },
              }}
            />
            <Button
              sx={{
                "& > :not(style)": { m: 2 },
              }}
              className="btn__popup"
              variant="contained"
              onClick={(e) => handleSubmit(e)}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupMailChimp;
