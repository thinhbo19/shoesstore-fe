import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Button } from "@mui/material";
import axios from "axios";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import {
  addCard,
  addFavorite,
  removeFavorite,
  selectAccessToken,
} from "@/services/Redux/user/useSlice";
import { useRouter } from "next/navigation";
import { apiUrlUser } from "@/services/config";
import { InlineShareButtons } from "sharethis-reactjs";

const DetailsFirst = ({ product, userRes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const Swal = require("sweetalert2");
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const productId = product._id;
  const dispatch = useDispatch();
  const [isCart, setIsCart] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const favorites = userRes.Favorites;
      const isProductInFavorites = favorites.some(
        (favorite) => favorite === product._id
      );
      setIsFavorite(isProductInFavorites);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, product._id]);

  const changeImage = (newIndex) => {
    setCurrentImageIndex(newIndex);
  };

  const increaseQuantity = () => {
    const maxQuantity = selectedSize ? selectedSize.numberOfSize : 0;
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "info",
        title: `Size này chỉ có ${maxQuantity} sản phẩm.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const handleSizeButtonClick = (size) => {
    setSelectedSize(size);
    setQuantity(0);
  };
  const handleAddFavorite = async (e) => {
    e.stopPropagation();
    if (!accessToken) {
      Swal.fire({
        icon: "warning",
        title: "Bạn chưa đăng nhập",
        text: "Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích.",
        confirmButtonText: "Đăng nhập",
        showCancelButton: true,
        cancelButtonText: "Hủy",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login-register";
        }
      });
      return;
    }
    setIsFavorite(!isFavorite);

    try {
      const response = await axios.put(
        `${apiUrlUser}/favorites/${product._id}`,
        null,
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.success === true) {
        dispatch(addFavorite(productId._id));
        Swal.fire({
          position: "top-end",
          text: "Đã Thêm Vào Yêu Thích",
          icon: "success",
          showConfirmButton: false,
        });
      } else if (response.data.success === false) {
        dispatch(removeFavorite(productId._id));
        Swal.fire({
          position: "top-end",
          text: "Đã Bỏ Yêu Thích",
          icon: "info",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };
  const addShoppingCart = async () => {
    if (!accessToken) {
      Swal.fire({
        title: "Bạn chưa đăng nhập!",
        text: "Bạn hãy đăng nhập để được mua hàng",
        icon: "warning",
      });
      return;
    }

    if (!selectedSize) {
      Swal.fire({
        title: "Vui lòng chọn kích cỡ!",
        icon: "warning",
      });
      return;
    }

    if (quantity <= 0) {
      Swal.fire({
        title: "Vui lòng thêm số lượng!",
        icon: "warning",
      });
      return;
    }

    const userConfirmed = await Swal.fire({
      title: "Xác nhận thêm vào giỏ hàng?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Hủy",
    });

    if (userConfirmed.isConfirmed) {
      setIsCart(true);
      try {
        await axios.put(
          `${apiUrlUser}/Cart`,
          {
            pid: productId,
            name: product.productName,
            size: selectedSize.size,
            count: quantity,
            price: product.price,
            img: product.images[0],
          },
          { headers: { token: `Bearer ${accessToken}` } }
        );
        dispatch(addCard(productId));
        Swal.fire({
          title: "Thêm vào giỏ hàng thành công!",
          icon: "success",
        });
        setSelectedSize(null);
        setQuantity(0);
      } catch (error) {
        Swal.fire({
          title: "Lỗi khi thêm vào giỏ hàng",
          text: error.message,
          icon: "error",
        });
        console.log(error);
      } finally {
        setIsCart(false);
      }
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!accessToken) {
        throw new Error("Vui lòng đăng nhập để mua hàng!");
      }
      if (!selectedSize) {
        throw new Error("Vui lòng chọn kích cỡ!");
      }
      if (quantity <= 0) {
        throw new Error("Vui lòng thêm số lượng!");
      }
      const userConfirmed = await Swal.fire({
        title: "Xác nhận mua sản phẩm?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Hủy",
      });

      if (userConfirmed.isConfirmed) {
        const data = {
          pid: productId,
          name: product.productName,
          size: selectedSize.size,
          count: quantity,
          price: product.price,
          img: product.images[0],
        };

        localStorage.setItem("cart", JSON.stringify([data]));

        router.push(`/thanh-toan-ngay`);
        setSelectedSize(null);
        setQuantity(0);
      }
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: error.message,
        icon: "warning",
      });
    }
  };

  return (
    <div className="details-firts">
      <div className="first-left">
        <div className="imgList">
          <img
            className="img-main"
            src={product.images[currentImageIndex]}
            alt={product.name}
          />

          <div className="imgDescriptionList">
            <KeyboardArrowUpIcon
              className="icon"
              onClick={() =>
                changeImage(
                  (currentImageIndex - 1 + product.images.length) %
                    product.images.length
                )
              }
            />
            {product.images.map((image, index) => {
              return (
                <img
                  onClick={() => changeImage(index)}
                  key={index}
                  className="img-description"
                  src={image}
                  alt={product.name}
                  style={{
                    flex: "0 0 auto",
                    display: index < 4 ? "block" : "none",
                  }}
                />
              );
            })}

            <KeyboardArrowDownIcon
              className="icon"
              onClick={() =>
                changeImage((currentImageIndex + 1) % product.images.length)
              }
            />
          </div>
        </div>
      </div>
      <div className="first-right">
        <h1 style={{ fontSize: "1.4rem" }} className="name-product">
          {product.productName}
        </h1>
        <p className="price-product">
          Giá: {product.price.toLocaleString()}&#8363;
        </p>
        <p>Kích cỡ: </p>
        <div className="size-product">
          {product.quantity.map((item, index) => (
            <div key={index}>
              <button
                className={`size ${selectedSize === item ? "selected" : ""}`}
                onClick={() => handleSizeButtonClick(item)}
                disabled={item.numberOfSize === 0}
              >
                {item.size}
              </button>
            </div>
          ))}
        </div>
        <div className="quantity-product">
          <p>Số lượng: </p>
          <div className="quantity-content">
            <button className="btn" onClick={decreaseQuantity}>
              -
            </button>
            <input
              type="text"
              value={quantity}
              className="quantity"
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value, 10);
                if (
                  !isNaN(newQuantity) &&
                  newQuantity >= 0 &&
                  newQuantity <= (selectedSize ? selectedSize.numberOfSize : 0)
                ) {
                  setQuantity(newQuantity);
                }
              }}
            />
            <button className="btn" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div>
            <p style={{ marginLeft: "5px", fontSize: "1.2rem" }}>
              {selectedSize && (
                <span>
                  (Size: {selectedSize.size}, Số Lượng:{" "}
                  {selectedSize.numberOfSize})
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="btn-details-product">
          <Button className="btn cart" onClick={addShoppingCart}>
            {isCart ? "ĐANG THÊM....." : "THÊM VÀO GIỎ HÀNG"}
          </Button>
          <Button className="btn buy" onClick={handleBuyNow}>
            MUA NGAY
          </Button>
          <button className="iconFavoriteDetail" onClick={handleAddFavorite}>
            <FontAwesomeIcon
              icon={isFavorite ? faHeartSolid : faHeart}
              style={{ color: isFavorite ? "red" : "black" }}
            />
          </button>
        </div>

        <div className="share-product">
          <InlineShareButtons
            config={{
              alignment: "left",
              color: "social",
              enabled: true,
              font_size: 16,
              labels: "cta",
              language: "en",
              networks: ["messenger", "facebook"],
              padding: 12,
              radius: 4,
              size: 40,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsFirst;
