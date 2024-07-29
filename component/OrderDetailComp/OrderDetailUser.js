import { formatDate } from "@/hooks/useFormatTime";
import {
  faClock,
  faFileAlt,
  faLocation,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OrderDetailUser = ({
  user,
  address,
  paymentStatus,
  paymentMethod,
  status,
  returnValue,
  createdAt,
  updatedAt,
}) => {
  console.log(status);
  return (
    <div className="order__detail__user">
      <div className="order__detail__user__header">
        <p className="order__detail__h3">Thông tin hóa đơn</p>
      </div>
      <div className="order__detail__user__info">
        <div className="order__detail__user__location">
          <FontAwesomeIcon className="icon__order__detail" icon={faLocation} />
          <p className="p__order__detail">Địa chỉ nhận hàng</p>
        </div>
        <div className="order__detail__user__info__right">
          <p>Họ Tên: {user?.username}</p>
          <p>Điện Thoại: {user?.phoneNumber}</p>
          <p>Địa Chỉ: {address}</p>
        </div>
      </div>

      <div className="order__detail__user__info">
        <div className="order__detail__user__location">
          <FontAwesomeIcon className="icon__order__detail" icon={faMoneyBill} />{" "}
          <p className="p__order__detail">Phương thức thanh toán</p>
        </div>
        <div className="order__detail__user__info__right">
          <p>{paymentMethod}</p>
        </div>
      </div>
      <div className="order__detail__user__info">
        <div className="order__detail__user__location">
          <FontAwesomeIcon className="icon__order__detail" icon={faFileAlt} />{" "}
          <p className="p__order__detail">Tình trạng đơn hàng</p>
        </div>
        <div className="order__detail__user__info__right">
          {status === "Processing" ? (
            <p style={{ color: "red" }}>{returnValue(status)}</p>
          ) : null}
          {status === "Shipping" ? (
            <p style={{ color: "red" }}>{returnValue(status)}</p>
          ) : null}
          {status === "Success" ? (
            <p style={{ color: "green" }}>{returnValue(status)}</p>
          ) : null}
          {status === "Cancelled" ? (
            <p style={{ color: "red" }}>{returnValue(status)}</p>
          ) : null}
        </div>
      </div>

      <div className="order__detail__user__info">
        <div className="order__detail__user__location">
          <FontAwesomeIcon className="icon__order__detail" icon={faClock} />
          <p className="p__order__detail">Ngày lập đơn</p>
        </div>
        <div className="order__detail__user__info__right">
          <p>{formatDate(createdAt)}</p>
        </div>
      </div>

      {status !== "Processing" ? (
        <div className="order__detail__user__info">
          <div className="order__detail__user__location">
            <FontAwesomeIcon className="icon__order__detail" icon={faClock} />
            {status === "Shipping" ? (
              <p className="p__order__detail">Ngày xác nhận</p>
            ) : null}
            {status === "Success" ? (
              <p className="p__order__detail">Ngày nhận hàng</p>
            ) : null}
            {status === "Cancelled" ? (
              <p className="p__order__detail">Ngày hủy</p>
            ) : null}
          </div>
          <div className="order__detail__user__info__right">
            <p>{formatDate(updatedAt)}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderDetailUser;
