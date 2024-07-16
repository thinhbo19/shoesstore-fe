"use client";

import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import "./Headers.css";
import ToolbarControl from "./ToolbarControl";
import MenuLink from "./MenuLink";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Logo from "/public/Logo.png";
import { getCategory } from "@/services/Redux/fetchData/useFetchData";

const handleLogoClick = () => {
  window.location.href = "/";
};

function ResponsiveAppBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        setCategories(res);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <AppBar position="static" className="navbar-main">
      <Container
        className="main-nav"
        maxWidth="xl"
        sx={{
          backgroundColor: "white",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{ position: "relative" }}
          className="sub-nav"
          disableGutters
        >
          <Box className="Logo" sx={{ width: 200 }}>
            <Image
              src={Logo}
              alt="Logo"
              onClick={handleLogoClick}
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
          <MenuLink categories={categories} />
          <SearchBar />
          <ToolbarControl />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
