import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "./Sliders.css";
import Link from "next/link";
import { handleProductID } from "@/utils/hanleGet";
import { useDispatch } from "react-redux";
import { apiUrlProduct } from "@/services/config";

const DifferentProduct = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProductsResponse = await axios.get(`${apiUrlProduct}`);
        const allProducts = allProductsResponse.data.productDatas;
        setProductData(allProducts);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = () => {
    window.location.reload();
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-product-cart">
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : productData.length > 0 ? (
        <Slider {...settings}>
          {productData.map((product) => (
            <div
              key={product._id}
              className="slider-product-cart-bottom"
              onClick={handleProductClick}
            >
              <Link
                href={`/san-pham/${product.productName}`}
                style={{ textDecoration: "none", color: "black" }}
                onClick={() => handleProductID(dispatch, product._id)}
              >
                <img src={product.images[0]} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>Giá: {product.price} VNĐ</p>
              </Link>
            </div>
          ))}
        </Slider>
      ) : (
        <p>Không có sản phẩm để hiển thị</p>
      )}
    </div>
  );
};

export default DifferentProduct;
