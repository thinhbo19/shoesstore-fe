"use client";
import { Typography, Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useState } from "react";
import { slugify } from "@/utils/slugify";
import { handleCateID } from "@/utils/hanleGet";
import { useDispatch } from "react-redux";

const MenuLink = ({ categories }) => {
  const [anchorCollection, setAnchorCollection] = useState(null);
  const dispatch = useDispatch();

  const handleOpenCollectionMenu = (event) => {
    setAnchorCollection(event.currentTarget);
  };

  const handleCloseCollectionMenu = () => {
    setAnchorCollection(null);
  };

  return (
    <Box
      className="menu-link"
      sx={{
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
      }}
    >
      <Link
        sx={{ my: 2, display: "block", width: "12rem" }}
        className="buttonPage"
        href="/"
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
      <Tooltip>
        <Button onClick={handleOpenCollectionMenu} className="buttonPage">
          <p
            style={{ margin: "0 0 0 5px", textAlign: "center" }}
            className="linkPage"
          >
            BỘ SƯU TẬP
          </p>
        </Button>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorCollection}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorCollection)}
          onClose={handleCloseCollectionMenu}
        >
          <MenuItem onClick={handleCloseCollectionMenu} className="menu-item">
            {categories?.map((category) => (
              <Link
                key={category.categoryName}
                className="link-item"
                href={`/san-pham/danh-muc-san-pham/${slugify(
                  category.categoryName
                )}`}
                onClick={() => handleCateID(dispatch, category._id)}
              >
                <Typography
                  key={category._id}
                  className="setting-item"
                  sx={{
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "black",
                  }}
                  textAlign="center"
                >
                  {category.categoryName}
                </Typography>
              </Link>
            ))}
          </MenuItem>
        </Menu>
      </Tooltip>
    </Box>
  );
};

export default MenuLink;
