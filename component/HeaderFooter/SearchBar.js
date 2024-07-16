"use client";

import React, { useState, useEffect, useRef } from "react";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import "./Headers.css";
import Loading from "../Loading/Loading";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Link from "next/link";
import debounce from "lodash.debounce";
import { getProduct } from "@/services/Redux/fetchData/useFetchData";
import { handleProductID } from "@/utils/hanleGet";
import { useDispatch } from "react-redux";
import { slugify } from "@/utils/slugify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hasInput, setHasInput] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getProduct();
        const productData = res.data.productDatas;
        setProductData(productData);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = debounce((query) => {
    if (query !== "") {
      if (Array.isArray(productData)) {
        const filteredResults = productData.filter((product) =>
          product.productName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredResults);
        setHasInput(true);
      } else {
        console.error("Dữ liệu sản phẩm không hợp lệ.");
      }
    } else {
      setSearchResults([]);
      setHasInput(false);
    }
  }, 300);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
        setHasInput(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleBlur = () => {
    if (searchQuery === "") {
      setIsSearchOpen(false);
    }
  };

  const handleLinkClick = (productID) => {
    setSearchQuery("");
    setSearchResults([]);
    setHasInput(false);
    setIsSearchOpen(false);
    handleProductID(dispatch, productID);
  };

  const handleSearchInput = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]);
      setHasInput(false);
      return;
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Search ref={searchInputRef}>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: "black" }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Tìm kiếm..."
        inputProps={{ "aria-label": "search" }}
        sx={{
          width: "30rem",
          height: "10px",
          color: "black",
          fontSize: "16px",
          padding: "18px",
          border: "2px solid black",
          borderRadius: "20px",
        }}
        value={searchQuery}
        onChange={handleSearchInput}
        onBlur={handleBlur}
      />

      {hasInput && searchResults.length !== 0 ? (
        <div className="result-search">
          {searchResults.map(
            (product, index) =>
              index < 5 && (
                <Link
                  className="link-result"
                  onClick={() => handleLinkClick(product._id)}
                  key={product._id}
                  style={{ textDecoration: "none" }}
                  href={`/san-pham/${slugify(product.productName)}`}
                >
                  <div className="imgName">
                    <ArrowRightIcon className="icon" sx={{ color: "black" }} />
                    <p
                      className="namePro"
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {product.productName}
                    </p>
                  </div>
                </Link>
              )
          )}
        </div>
      ) : (
        hasInput && (
          <div className="result-search-noproduct">
            <span
              style={{
                color: "black",
                height: "60px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Không tìm thấy sản phẩm
            </span>
          </div>
        )
      )}
    </Search>
  );
}

export default SearchBar;
