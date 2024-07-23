import styles from "./ShoppingCartMenu.module.css";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { handleProductID } from "@/utils/hanleGet";
import { slugify } from "@/utils/slugify";

const ShoppingCartMenu = ({ shoppingCart }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.shoppingProductsMenu}>
      {shoppingCart.length === 0 ? (
        <div className={styles.noFavorite}>
          <span>Giỏ Hàng Trống.</span>
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
