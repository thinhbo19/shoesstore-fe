import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Sliders.css";
import Link from "next/link";
import { handleProductID } from "@/utils/hanleGet";
import { useDispatch, useSelector } from "react-redux";
import { selectProductID } from "@/services/Redux/product/productSlice";
import { apiUrlProduct } from "@/services/config";

const SliderProductCart = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderRef, setSliderRef] = useState(null);
  const productId = useSelector(selectProductID);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProductsResponse = await axios.get(`${apiUrlProduct}`);
        const productResponse = await axios.get(
          `${apiUrlProduct}/?_id=${productId}`
        );

        const allProducts = allProductsResponse.data.productDatas;
        const selectedProduct = productResponse.data.productDatas[0];

        if (allProductsResponse.data.success && productResponse.data.success) {
          const similarProducts = allProducts.filter(
            (product) =>
              product.brand === selectedProduct.brand ||
              product.category === selectedProduct.category
          );
          setProductData(similarProducts);
        } else {
          console.error(
            "Lỗi khi lấy dữ liệu từ API:",
            allProductsResponse.data.error
          );
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

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

  const goToNext = () => {
    sliderRef.slickNext();
  };

  const goToPrev = () => {
    sliderRef.slickPrev();
  };

  const handleProductClick = () => {
    window.location.reload();
  };

  return (
    <div className="slider-product-cart">
      {loading ? (
        <p>Đang tải sản phẩm...</p>
      ) : productData.length > 0 ? (
        <Slider {...settings} ref={(slider) => setSliderRef(slider)}>
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
      <div className="slider-product-cart-move">
        <button className="btn-left" onClick={goToPrev}>
          <FontAwesomeIcon icon={faAngleLeft} size="lg" color="black" />
        </button>

        <button className="btn-right" onClick={goToNext}>
          <FontAwesomeIcon icon={faAngleRight} size="lg" color="black" />
        </button>
      </div>
    </div>
  );
};

export default SliderProductCart;
