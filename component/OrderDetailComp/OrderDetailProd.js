import { handleProductID } from "@/utils/hanleGet";
import { slugify } from "@/utils/slugify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OrderDetailProd = ({
  products,
  dispatch,
  totalPrice,
  calculateTotalCount,
}) => {
  const totalCount = calculateTotalCount(products);
  return (
    <div className="order__detail__products">
      <div className="order__detail__products__top">
        <p className="order__detail__h3">Sản phẩm đã mua</p>
        <div className="products__hasBuy">
          {products?.map((prod, index) => (
            <div key={index} className="product__items">
              <Image
                src={prod.img}
                width={100}
                height={100}
                alt="Image"
                priority
              />
              <div className="product__info">
                <p className="product__info__name">{prod.name}</p>
                <p className="product__info__detail">Size: {prod.size}</p>
                <p className="product__info__detail">{prod.count} đôi</p>
                <p className="product__info__detail price">
                  {prod.price.toLocaleString()} VNĐ
                </p>
              </div>
              <div className="link-rating">
                <Link
                  className="link-product"
                  href={`/san-pham/${slugify(prod.name)}`}
                  onClick={() => handleProductID(dispatch, prod.product)}
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="order__detail__products__bot">
        <div className="order__detail__products__bot_count">
          <p className="product__info__totalPrice">- SỐ LƯỢNG GIÀY: </p>
          <p className="product__info__totalPrice count">{totalCount} đôi</p>
        </div>
        <div className="order__detail__products__bot_price">
          <p className="product__info__totalPrice">- TỔNG TIỀN: </p>
          <p className="product__info__totalPrice price">{totalPrice} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailProd;
