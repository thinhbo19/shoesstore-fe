"use client";
import React, { useState, useEffect } from "react";
import PageController from "@/component/SanPham/PageController";
import ProductList from "@/component/SanPham/ProductList";
import Loading from "@/component/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import "../../../../../Styles/SanPham/SanPham.css";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  addFavorite,
  removeFavorite,
  selectAccessToken,
} from "@/services/Redux/user/useSlice";
import { selectCateID } from "@/services/Redux/product/productSlice";
import { getProductByIdCate } from "@/services/Redux/fetchData/useFetchData";
import { apiUrlBrand, apiUrlUser } from "@/services/config";
import BreadcrumbForCate from "@/component/Breadcrumb/BreadcrumbForCate";
import {
  addFavorites,
  getUserCurrent,
} from "@/services/Redux/handle/hanldeUser";

const Alert = React.forwardRef((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const SanPhamDanhMuc = ({ categoryName, brands }) => {
  const categoryID = useSelector(selectCateID);
  const [initialProducts, setInitialProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const sanPhamTrenMotTrang = 12;
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentSort, setCurrentSort] = useState("");
  const [checkBrand, setCheckBrand] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const [open, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [messageServerity, setMessageServerity] = useState("");
  const [loadingPage, setLoadingPage] = useState(false);
  const [productCountsByBrand, setProductCountsByBrand] = useState({});
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpenSnackbar(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const FilterPrice = (priceRange) => {
    const filteredProducts = initialProducts.filter((product) => {
      const price = product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    setFilteredProducts(filteredProducts);
    setTrangHienTai(1);
  };
  const FilterBrand = (brandId) => {
    const updatedCheckBrand = [...checkBrand];

    if (updatedCheckBrand.includes(brandId)) {
      const index = updatedCheckBrand.indexOf(brandId);
      updatedCheckBrand.splice(index, 1);
    } else {
      updatedCheckBrand.push(brandId);
    }

    setCheckBrand(updatedCheckBrand);
    const filteredProducts = filterProductsByBrand(
      initialProducts,
      updatedCheckBrand
    );
    setFilteredProducts(filteredProducts);
    setCurrentSort("");
    setShowFilterOptions(showFilterOptions);
    setTrangHienTai(1);
  };
  const filterProductsByBrand = (products, selectedBrands) => {
    if (!selectedBrands || selectedBrands.length === 0) {
      return products;
    }
    const filteredProducts = products.filter((product) =>
      selectedBrands.includes(product.brand)
    );

    return filteredProducts;
  };
  const handleaddFavorite = async (productId, setIsFavorites) => {
    if (!accessToken) {
      setMessage("BẠN CHƯA ĐĂNG NHẬP TÀI KHOẢN!");
      setMessageServerity("warning");
      setIsFavorites(false);
      handleClick();
      return;
    }

    try {
      const response = await addFavorites(accessToken, productId);
      if (response.data.success === true) {
        setMessage("ĐÃ THÊM VÀO YÊU THÍCH!");
        setMessageServerity("success");
        dispatch(addFavorite(productId));
      } else if (response.data.success === false) {
        setMessage("ĐÃ BỎ YÊU THÍCH SẢN PHẨM!");
        setMessageServerity("info");
        dispatch(removeFavorite(productId));
      }
      handleClick();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProductByIdCate(categoryID);
        const uniqueProducts = products.data.productDatas.reverse();

        const productCounts = {};
        uniqueProducts.forEach((product) => {
          const brandId = product.brand;
          productCounts[brandId] = (productCounts[brandId] || 0) + 1;
        });
        setProductCountsByBrand(productCounts);

        if (accessToken) {
          const res = await getUserCurrent(accessToken);
          const favorites = res.Favorites;

          const isProductInFavorites = uniqueProducts.map((prod) => {
            const isFavorite = favorites.some(
              (favorite) => favorite === prod._id
            );
            return { ...prod, isFavorite };
          });

          setInitialProducts(isProductInFavorites);
          setFilteredProducts(isProductInFavorites);
        } else {
          const isProductInFavorites = uniqueProducts.map((prod) => ({
            ...prod,
            isFavorite: false,
          }));
          setInitialProducts(isProductInFavorites);
          setFilteredProducts(isProductInFavorites);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      } finally {
        setLoadingPage(false);
      }
    };

    fetchData();
  }, [accessToken, categoryID]);

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
    }, 1200);
  }, []);

  const sortFunctions = {
    AZ: (a, b) => a.productName.localeCompare(b.productName),
    ZA: (a, b) => b.productName.localeCompare(a.productName),
    PriceAsc: (a, b) => a.price - b.price,
    PriceDesc: (a, b) => b.price - a.price,
  };
  const handleSort = (type) => {
    const sortFunction = sortFunctions[type] || ((a, b) => a - b);
    const sorted = [...filteredProducts].sort(sortFunction);
    setFilteredProducts(sorted);
    setCurrentSort(type);
    setTrangHienTai(1);

    setShowFilterOptions(false);
  };

  if (loading) {
    return <Loading />;
  }

  const viTriSanPhamCuoiCung = trangHienTai * sanPhamTrenMotTrang;
  const viTriSanPhamDauTien = viTriSanPhamCuoiCung - sanPhamTrenMotTrang;
  const sanPhamTrenTrangHienTai = filteredProducts.slice(
    viTriSanPhamDauTien,
    viTriSanPhamCuoiCung
  );

  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "5px" }}>
      <BreadcrumbForCate categoryName={categoryName} />
      <div className="content">
        <ProductList
          currentSort={currentSort}
          showFilterOptions={showFilterOptions}
          toggleFilterOptions={toggleFilterOptions}
          handleSort={handleSort}
          brands={brands}
          sanPhamTrenTrangHienTai={sanPhamTrenTrangHienTai}
          checkBrand={checkBrand}
          FilterBrand={FilterBrand}
          FilterPrice={FilterPrice}
          handleaddFavorite={handleaddFavorite}
          loadingPage={loadingPage}
          productCountsByBrand={productCountsByBrand}
        />
        <PageController
          trangHienTai={trangHienTai}
          paginate={setTrangHienTai}
          products={filteredProducts}
          sanPhamTrenMotTrang={sanPhamTrenMotTrang}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={messageServerity}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.4rem",
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SanPhamDanhMuc;
