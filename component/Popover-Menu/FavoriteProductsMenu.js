import Link from "next/link";
import styles from "./FavoriteProductsMenu.module.css";
import { useDispatch } from "react-redux";
import { slugify } from "@/utils/slugify";
import { handleProductID } from "@/utils/hanleGet";
import Image from "next/image";

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
        <>
          <h3>Sản Phẩm Yêu Thích</h3>
          {displayedProducts.map((product) => (
            <Link
              key={product._id}
              style={{ textDecoration: "none" }}
              href={`/san-pham/${slugify(product.productName)}`}
              onClick={() => handleProductID(dispatch, product._id)}
            >
              <div className={styles.imgName}>
                <Image
                  src={product.images[0]}
                  alt={product.productName}
                  width={80}
                  height={80}
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
                    {product.productName}
                  </p>
                  <p
                    className={styles.namePro}
                    style={{ color: "red", textDecoration: "underline" }}
                  >
                    {product.price}&#8363;
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
      <Link href="/thong-tin/yeu-thich" className={styles.btnAllFavoritePro}>
        Xem tất cả
      </Link>
    </div>
  );
};

export default FavoriteProductsMenu;
