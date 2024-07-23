"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  selectAdmin,
  selectIsLoggedIn,
  setLogout,
  selectAccessToken,
} from "../../services/Redux/user/useSlice";
import { getUserFavorites, getCart } from "../../services/Redux/api";
import useForceUpdate from "../../services/forceUpdate";
import { getAvatar } from "@/services/Redux/handle/hanldeUser";
import "./Headers.css";

// Styled Badge component
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    color: "white",
    backgroundColor: "red",
  },
}));

const ToolbarControl = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [favoriteMenuOpen, setFavoriteMenuOpen] = useState(false);
  const [shoppingCartMenuOpen, setShoppingCartMenuOpen] = useState(false);
  const [noitifiMenuOpen, setNoitifiMenuOpen] = useState(false);
  const [badgeFavorites, setBadgeFavorites] = useState([]);
  const [badgeCart, setBadgeCart] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectAdmin);
  const accessToken = useSelector(selectAccessToken);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    let isMounted = true;

    // Retrieve saved notification count from localStorage
    const savedNotificationCount = localStorage.getItem("notificationCount");
    if (savedNotificationCount) {
      setNotificationCount(parseInt(savedNotificationCount, 10));
    }

    const fetchData = async () => {
      try {
        const [favorites, userAvatar, shoppingCart] = await Promise.all([
          getUserFavorites(accessToken),
          getAvatar(accessToken),
          getCart(accessToken),
        ]);
        if (isMounted) {
          setAvatar(userAvatar);
          setBadgeFavorites(favorites);
          setBadgeCart(shoppingCart);
          forceUpdate();
        }
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [accessToken, forceUpdate]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleFavoriteIconMouseEnter = () => setFavoriteMenuOpen(true);
  const handleFavoriteIconMouseLeave = () => setFavoriteMenuOpen(false);

  const handleShoppingCartIconMouseEnter = () => setShoppingCartMenuOpen(true);
  const handleShoppingCartIconMouseLeave = () => setShoppingCartMenuOpen(false);

  const handleNoitifiIconMouseEnter = () => setNoitifiMenuOpen(true);
  const handleNoitifiIconMouseLeave = () => setNoitifiMenuOpen(false);

  const handleLogout = () => {
    dispatch(setLogout());
    window.location.pathname = "/dang-nhap";
  };

  return (
    <div
      className="toolbar-control"
      style={{ flexGrow: 0, marginLeft: "10px" }}
    >
      {/* Shopping Cart Icon */}
      <Link
        className="shoppingcart-hover"
        href="/gio-hang"
        onMouseEnter={handleShoppingCartIconMouseEnter}
        onMouseLeave={handleShoppingCartIconMouseLeave}
      >
        <IconButton>
          <StyledBadge badgeContent={badgeCart.length}>
            <ShoppingCartOutlinedIcon fontSize="medium" />
          </StyledBadge>
        </IconButton>
        {shoppingCartMenuOpen && <ShoppingCartMenu />}
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
          <StyledBadge badgeContent={badgeFavorites.length}>
            <FavoriteBorderIcon fontSize="medium" />
          </StyledBadge>
        </IconButton>
        {favoriteMenuOpen && <FavoriteProductsMenu />}
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
