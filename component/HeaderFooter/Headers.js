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
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccessToken,
  selectAdmin,
  selectCard,
  selectFavorites,
  selectIsLoggedIn,
  setLogout,
} from "@/services/Redux/user/useSlice";
import { useRouter } from "next/navigation";
import { getCart, getUserFavorites } from "@/services/Redux/api";

const handleLogoClick = () => {
  window.location.href = "/";
};

function ResponsiveAppBar({ allProducts }) {
  const accessToken = useSelector(selectAccessToken);
  const [categories, setCategories] = useState([]);
  const [userCurr, setUserCurr] = useState(null);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectAdmin);
  const favoritesLeng = useSelector(selectFavorites);
  const cartLength = useSelector(selectCard);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRes = await getCategory();
        setCategories(categoriesRes);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (accessToken) {
          const userRes = await getUserCurrent(accessToken);
          setUserCurr(userRes);

          const favorites = await getUserFavorites(accessToken);
          setFavoriteProducts(favorites);

          const cartList = await getCart(accessToken);
          setShoppingCart(cartList.reverse());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [accessToken, userCurr]);

  const handleLogout = () => {
    dispatch(setLogout());
    router.push("/dang-nhap");
  };

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
          <ToolbarControl
            accessToken={accessToken}
            avatar={userCurr?.Avatar}
            badgeCart={userCurr?.Cart || []}
            favoritesLeng={favoritesLeng}
            cartLength={cartLength}
            dispatch={dispatch}
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            handleLogout={handleLogout}
            allProducts={allProducts}
            favoriteProducts={favoriteProducts}
            shoppingCart={shoppingCart}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
