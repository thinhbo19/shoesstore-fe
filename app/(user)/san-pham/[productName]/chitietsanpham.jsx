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

const ChiTietSanPham = () => {
  const productId = useSelector(selectProductID);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await getProductByIdProduct(productId);
      setProduct(response.data.productData);
      setLoading(false);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    }
  }, [productId]);

  useEffect(() => {
    const fetchDataAndSetLoading = async () => {
      setLoading(false);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
      await fetchData();
    };

    const timeoutId = setTimeout(fetchDataAndSetLoading, 1200);

    return () => clearTimeout(timeoutId);
  }, [fetchData]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div
      style={{ padding: "2rem 10rem", backgroundColor: "#f0f0f0" }}
      className="main-content-details"
    >
      {product ? (
        <>
          <DetailsFirst product={product} />
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
        <p>Sản phẩm không tồn tại</p>
      )}
    </div>
  );
};

export default ChiTietSanPham;
