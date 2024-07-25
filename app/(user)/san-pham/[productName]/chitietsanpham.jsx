"use client";
import React, { useState, useEffect, useCallback } from "react";
import "../../../../Styles/productDetailFirst.css";
import "../../../../Styles/productDetailSecond.css";
import "../../../../Styles/productDetailThird.css";
import { useSelector } from "react-redux";
import { selectProductID } from "@/services/Redux/product/productSlice";
import Loading from "@/component/Loading/Loading";
import DetailsFirst from "@/component/ChiTietSanPham/DetailsFirst";
import DetailSecond from "@/component/ChiTietSanPham/DetailSecond";
import DetailThird from "@/component/ChiTietSanPham/DetailThird";
import SliderProductCart from "@/component/Slider/SliderProductCart";
import { getProductByIdProduct } from "@/services/Redux/fetchData/useFetchData";
import BreadcrumbForProdDetail from "@/component/Breadcrumb/BreadcrumbForProdDetail";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";

const ChiTietSanPham = ({ productName }) => {
  const productId = useSelector(selectProductID);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const [userRes, setUserRes] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getProductByIdProduct(productId);
      const userRes = await getUserCurrent(accessToken);
      setUserRes(userRes);
      setProduct(response);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  }, [productId]);

  useEffect(() => {
    localStorage.removeItem("cart");
    localStorage.removeItem("cartList");
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{ padding: "2rem 10rem", backgroundColor: "#f0f0f0" }}
      className="main-content-details"
    >
      <BreadcrumbForProdDetail productName={product?.productName} />
      {product ? (
        <>
          <DetailsFirst product={product} userRes={userRes} />
          <DetailSecond product={product} />
          <DetailThird product={product} />
          <div className="different-product">
            <h2
              style={{
                fontStyle: "bold",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <p className="label-other-product"></p>SẢN PHẨM KHÁC
            </h2>
            <SliderProductCart />
          </div>
        </>
      ) : (
        <p>Đang tải....</p>
      )}
    </div>
  );
};

export default ChiTietSanPham;
