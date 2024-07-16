"use client";
import styles from "./ShoppingCartMenu.module.css"; // Import CSS module
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getCart } from "@/services/Redux/api";
import Link from "next/link";
import Image from "next/image";
import { handleProductID } from "@/utils/hanleGet";
import { slugify } from "@/utils/slugify";

const ShoppingCartMenu = () => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cartList = await getCart(accessToken);
        setShoppingCart(cartList.reverse());
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

  return (
    <div className={styles.shoppingProductsMenu}>
      {shoppingCart.length === 0 ? (
        <div className={styles.noFavorite}>
          {isLoading ? <>Loading...</> : <span>Giỏ Hàng Trống.</span>}
        </div>
      ) : (
        <ul>
          <h3>Giỏ Hàng</h3>
          {shoppingCart.slice(0, 3).map((cart) => (
            <Link
              href={`/san-pham/${slugify(cart.name)}`}
              key={cart._id}
              style={{ textDecoration: "none", zIndex: "1000" }}
              onClick={() => handleProductID(dispatch, cart.product)}
            >
              <li>
                <div className={styles.imgName}>
                  <Image
                    src={cart.img}
                    alt={cart.name}
                    width={50}
                    height={50}
                  />
                  <div className="imgNametop">
                    <p
                      className={styles.namePro}
                      style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        maxWidth: "200px",
                      }}
                    >
                      {cart.name}
                    </p>
                    <p style={{ color: "black" }}>
                      size: {cart.size}, số lượng: {cart.count} đôi
                    </p>
                    <p
                      className={styles.pricePro}
                      style={{ color: "red", textDecoration: "underline" }}
                    >
                      {cart.price}&#8363;
                    </p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      )}
      <Link href="/gio-hang" className={styles.btnAllFavoritePro}>
        Xem tất cả
      </Link>
    </div>
  );
};

export default ShoppingCartMenu;
