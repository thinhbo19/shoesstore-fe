"use client";
import { useEffect } from "react";
import "../../Styles/login/Form.css";
import Login from "./DangNhap";
import Signup from "./DangKy";
import ForgotPass from "./QuenMK";
import Container from "@mui/material/Container";

export const LoginSignup = () => {
  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartList");
  }, []);

  return (
    <Container maxWidth="md" className="wrapper" sx={{ height: "80vh" }}>
      <Login />
      <ForgotPass />
      <Signup />
    </Container>
  );
};
