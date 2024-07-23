"use client";
import React, { useState } from "react";
import {
  Button,
  IconButton,
  Typography,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Link from "next/link";
import FavoriteProductsMenu from "../Popover-Menu/FavoriteProductsMenu";
import ShoppingCartMenu from "../Popover-Menu/ShoppingCartMenu";
import NoitificationMenu from "../Popover-Menu/NoitificationMenu";
import "./Headers.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "white",
    backgroundColor: "red",
  },
}));

const ToolbarControl = ({
  accessToken,
  avatar,
  badgeCart,
  favoritesLeng,
  cartLength,
  isLoggedIn,
  isAdmin,
  notificationCount,
  handleLogout,
  allProducts,
  favoriteProducts,
  shoppingCart,
}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [favoriteMenuOpen, setFavoriteMenuOpen] = useState(false);
  const [shoppingCartMenuOpen, setShoppingCartMenuOpen] = useState(false);
  const [noitifiMenuOpen, setNoitifiMenuOpen] = useState(false);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleFavoriteIconMouseEnter = () => setFavoriteMenuOpen(true);
  const handleFavoriteIconMouseLeave = () => setFavoriteMenuOpen(false);

  const handleShoppingCartIconMouseEnter = () => setShoppingCartMenuOpen(true);
  const handleShoppingCartIconMouseLeave = () => setShoppingCartMenuOpen(false);

  const handleNoitifiIconMouseEnter = () => setNoitifiMenuOpen(true);
  const handleNoitifiIconMouseLeave = () => setNoitifiMenuOpen(false);

  return (
    <div
      className="toolbar-control"
      style={{ flexGrow: 0, marginLeft: "10px" }}
    >
      {/* Shopping Cart Icon*/}
      <Link
        className="shoppingcart-hover"
        href="/gio-hang"
        onMouseEnter={handleShoppingCartIconMouseEnter}
        onMouseLeave={handleShoppingCartIconMouseLeave}
      >
        <IconButton>
          <StyledBadge badgeContent={cartLength.length}>
            <ShoppingCartOutlinedIcon fontSize="medium" />
          </StyledBadge>
        </IconButton>
        {shoppingCartMenuOpen && (
          <ShoppingCartMenu shoppingCart={shoppingCart} />
        )}
      </Link>

      {/* Notification Icon */}
      <Link
        className="noiti-hover"
        href="/thong-tin/thong-bao"
        onMouseEnter={handleNoitifiIconMouseEnter}
        onMouseLeave={handleNoitifiIconMouseLeave}
      >
        <IconButton>
          <StyledBadge badgeContent={notificationCount}>
            <NotificationsNoneOutlinedIcon fontSize="medium" />
          </StyledBadge>
        </IconButton>
        {noitifiMenuOpen && <NoitificationMenu />}
      </Link>

      {/* Favorite Icon */}
      <Link
        className="heart-hover"
        href="/thong-tin/yeu-thich"
        onMouseEnter={handleFavoriteIconMouseEnter}
        onMouseLeave={handleFavoriteIconMouseLeave}
      >
        <IconButton>
          <StyledBadge badgeContent={favoritesLeng?.length}>
            <FavoriteBorderIcon fontSize="medium" />
          </StyledBadge>
        </IconButton>
        {favoriteMenuOpen && (
          <FavoriteProductsMenu
            allProducts={allProducts}
            accessToken={accessToken}
            favoriteProducts={favoriteProducts}
          />
        )}
      </Link>

      {/* User Avatar */}
      <Tooltip title="Tài khoản">
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{ p: 0, marginLeft: "10px" }}
        >
          <Avatar alt="" src={avatar} sx={{ border: "2px solid black" }} />
        </IconButton>
      </Tooltip>

      {/* User Menu */}
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu} className="menu-item">
          {!isLoggedIn ? (
            <Link className="link-item" href="/dang-nhap">
              <Typography
                className="setting-item"
                sx={{
                  textDecoration: "none",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  color: "black",
                }}
                textAlign="center"
              >
                ĐĂNG NHẬP
              </Typography>
            </Link>
          ) : (
            <>
              {isAdmin === "User" ? (
                <>
                  <Link className="link-item" href="/thong-tin">
                    <Typography
                      className="setting-item"
                      sx={{
                        textDecoration: "none",
                        textTransform: "uppercase",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      textAlign="center"
                    >
                      THÔNG TIN
                    </Typography>
                  </Link>
                  <Link
                    className="link-item"
                    href="/thong-tin/lich-su-mua-hang"
                  >
                    <Typography
                      className="setting-item"
                      sx={{
                        textDecoration: "none",
                        textTransform: "uppercase",
                        color: "black",
                        fontWeight: "bold",
                      }}
                      textAlign="center"
                    >
                      ĐƠN MUA
                    </Typography>
                  </Link>
                </>
              ) : (
                <Link className="link-item" href="/dashboard">
                  <Typography
                    className="setting-item"
                    sx={{
                      textDecoration: "none",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    textAlign="center"
                  >
                    QUẢN LÝ
                  </Typography>
                </Link>
              )}
              <Button className="link-item" onClick={handleLogout}>
                <Typography
                  className="setting-item"
                  sx={{
                    textDecoration: "none",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    color: "black",
                  }}
                  textAlign="center"
                >
                  ĐĂNG XUẤT
                </Typography>
              </Button>
            </>
          )}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default ToolbarControl;
