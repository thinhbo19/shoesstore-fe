"use client";
import { Typography, Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { slugify } from "@/utils/slugify";
import { handleCateID } from "@/utils/hanleGet";
import { useDispatch } from "react-redux";

const MenuLink = ({ categories }) => {
  const [anchor, setAnchor] = useState(null);
  const [anchorCollection, setAnchorCollection] = useState(null);
  const dispatch = useDispatch();

  const handleOpenCollectionMenu = (event) => {
    setAnchorCollection(event.currentTarget);
  };

  const handleCloseCollectionMenu = () => {
    setAnchorCollection(null);
  };

  const handleOpenMenu = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  return (
    <Box
      className="menu-link"
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
        position: "relative",
      }}
    >
      <Link
        sx={{ my: 2, display: "block", width: "12rem" }}
        className="buttonPage"
        href="/"
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
      >
        <p className="linkPage">TRANG CHỦ</p>
      </Link>
      <Link
        className="buttonPage"
        sx={{ my: 2, display: "block", width: "12rem" }}
        href="/san-pham"
      >
        <p className="linkPage">SẢN PHẨM</p>
      </Link>
      <Link
        className="buttonPage"
        sx={{ my: 2, display: "block", width: "12rem" }}
        href="/ma-giam-gia-shop"
      >
        <p className="linkPage">MÃ GIẢM GIÁ</p>
      </Link>
      <Box
        className="buttonPage"
        sx={{ my: 2, display: "block", position: "relative" }}
        onMouseEnter={handleOpenCollectionMenu}
        onMouseLeave={handleCloseCollectionMenu}
      >
        <Button className="buttonPage" sx={{ width: "100%" }}>
          <p
            style={{ margin: "0 0 0 5px", textAlign: "center" }}
            className="linkPage"
          >
            BỘ SƯU TẬP
          </p>
        </Button>
        <Menu
          sx={{ mt: "0px" }}
          id="menu-appbar"
          anchorEl={anchorCollection}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorCollection)}
          onClose={handleCloseCollectionMenu}
        >
          {categories?.map((category) => (
            <MenuItem key={category._id} onClick={handleCloseCollectionMenu}>
              <Link
                className="link-item"
                href={`/san-pham/danh-muc-san-pham/${slugify(
                  category.categoryName
                )}`}
                onClick={() => handleCateID(dispatch, category._id)}
              >
                <Typography
                  className="setting-item"
                  sx={{
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {category.categoryName}
                </Typography>
              </Link>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default MenuLink;
