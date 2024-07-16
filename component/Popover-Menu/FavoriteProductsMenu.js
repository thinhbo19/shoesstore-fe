"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./FavoriteProductsMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getAllProducts, getUserFavorites } from "@/services/Redux/api";
import { slugify } from "@/utils/slugify";
import { handleProductID } from "@/utils/hanleGet";

const FavoriteProductsMenu = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const favorites = await getUserFavorites(accessToken);
        const allProductsData = await getAllProducts();

        setFavoriteProducts(favorites);
        setAllProducts(allProductsData);
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const displayedProducts = allProducts
    ? allProducts
        .filter((product) => favoriteProducts.includes(product._id))
        .slice(0, 4)
    : [];

  return (
    <div className={styles.favoriteProductsMenu}>
      {favoriteProducts.length === 0 ? (
        <div className={styles.noFavorite}>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <span>Bạn chưa yêu thích sản phẩm.</span>
          )}
        </div>
      ) : (
        <ul>
          <h3>Sản Phẩm Yêu Thích</h3>
          {displayedProducts.map((product) => (
            <Link
              key={product._id}
              style={{ textDecoration: "none" }}
              href={`/san-pham/${slugify(product.productName)}`}
              onClick={() => handleProductID(dispatch, product._id)}
            >
              <li>
                <div className={styles.imgName}>
                  <img src={product.images[0]} alt={product.productName} />
                  <p
                    className={styles.namePro}
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "200px",
                    }}
                  >
                    {product.productName}
                  </p>
                </div>
                <p
                  className={styles.pricePro}
                  style={{ color: "red", textDecoration: "underline" }}
                >
                  {product.price}&#8363;
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <Link href="/thong-tin/yeu-thich" className={styles.btnAllFavoritePro}>
        Xem tất cả
      </Link>
    </div>
  );
};

export default FavoriteProductsMenu;
