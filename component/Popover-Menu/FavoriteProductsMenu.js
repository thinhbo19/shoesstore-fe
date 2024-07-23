import Link from "next/link";
import styles from "./FavoriteProductsMenu.module.css";
import { useDispatch } from "react-redux";
import { slugify } from "@/utils/slugify";
import { handleProductID } from "@/utils/hanleGet";

const FavoriteProductsMenu = ({ allProducts, favoriteProducts }) => {
  const dispatch = useDispatch();

  const displayedProducts = allProducts
    ? allProducts
        .filter((product) => favoriteProducts.includes(product._id))
        .slice(0, 4)
    : [];

  return (
    <div className={styles.favoriteProductsMenu}>
      {favoriteProducts.length === 0 ? (
        <div className={styles.noFavorite}>
          <span>Bạn chưa yêu thích sản phẩm.</span>
        </div>
      ) : (
        <ul>
          <h3>Sản Phẩm Yêu Thích</h3>
          {displayedProducts.map((product) => (
            <Link
              className={styles.li}
              key={product._id}
              style={{ textDecoration: "none" }}
              href={`/san-pham/${slugify(product.productName)}`}
              onClick={() => handleProductID(dispatch, product._id)}
            >
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
