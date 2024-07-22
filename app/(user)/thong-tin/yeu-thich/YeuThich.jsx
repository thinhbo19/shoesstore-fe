"use client";
import React, { useState, useEffect } from "react";
import "../../../../Styles/user/ThongTinNguoiDung.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";
import { getAllProducts } from "@/services/Redux/api";
import { selectAccessToken } from "@/services/Redux/user/useSlice";

const YeuThich = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [favoritesResponse, allProductsResponse] = await Promise.all([
          getUserCurrent(accessToken),
          getAllProducts(),
        ]);

        const favorites = favoritesResponse.Favorites;
        const allProductsData = allProductsResponse;

        setFavoriteProducts(favorites);
        setAllProducts(allProductsData);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken, dispatch]);

  const displayedProducts = allProducts
    ? allProducts.filter((product) => favoriteProducts.includes(product._id))
    : [];
  return (
    <div className="content-infor">
      {favoriteProducts.length === 1 ? (
        <div className="no-favorite">
          <span>Bạn chưa yêu thích sản phẩm.</span>
        </div>
      ) : (
        <ul className="ul-favorite">
          {displayedProducts.map((product) => (
            <Link
              key={product._id}
              style={{ textDecoration: "none" }}
              href={`/san-pham/${slugify(product.productName)}`}
            >
              <li className="li-favorite">
                <div className="imgName">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="info-favorite">
                  <p
                    className="namePro"
                    style={{
                      fontSize: "1rem",
                    }}
                  >
                    {product.productName}
                  </p>
                  <p
                    className="pricePro"
                    style={{
                      fontSize: "1rem",
                      color: "red",
                      textDecoration: "underline",
                    }}
                  >
                    {product.price} &#8363;
                  </p>{" "}
                </div>
                <div className="more-product">
                  <Link
                    style={{ fontSize: "0.8rem" }}
                    href={`/san-pham/${slugify(product.productName)}`}
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YeuThich;
