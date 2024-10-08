import React from "react";
import "./ControlHis.css";
import { renderTextStatus } from "./SettingOrder";
import { Button } from "@mui/material";
import axios from "axios";
import { apiUrlOrder } from "@/services/config";

const AllComponent = ({
  accessToken,
  allOrder,
  fetchData,
  handleOrderDetailPage,
}) => {
  const Swal = require("sweetalert2");

  const handlePutStatus = async (orderId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn hủy đơn hàng này?",
        text: "Đơn hàng sẽ bị hủy!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await axios.put(
          `${apiUrlOrder}/status/${orderId}`,
          { status: newStatus },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
      }
      Swal.fire({
        title: "Đơn hàng đã hủy",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handlePutShipping = async (orderId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: "Bạn đã nhận được đơn hàng này?",
        text: "Đơn hàng của bạn sẽ được hoàn thành!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      });
      if (result.isConfirmed) {
        await axios.put(
          `${apiUrlOrder}/status/${orderId}`,
          { status: newStatus },
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
      }
      Swal.fire({
        title: "Thành công",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const renderStatusButton = (status, oid) => {
    switch (status) {
      case "Processing":
        return (
          <Button
            onClick={() => handlePutStatus(oid, "Cancelled")}
            sx={{
              width: "100px",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "red",
              },
              fontSize: "1rem",
            }}
            variant="contained"
          >
            Hủy
          </Button>
        );
      case "Shipping":
        return (
          <Button
            onClick={() => handlePutShipping(oid, "Success")}
            sx={{
              fontSize: "1rem",
              width: "250px",
              backgroundColor: "#ee8d2d",
              "&:hover": {
                backgroundColor: "#ee8d2d",
              },
            }}
            variant="contained"
          >
            Đã Nhận Được Hàng
          </Button>
        );
      case "Cancelled":
        return (
          <Button
            sx={{
              width: "100px",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            variant="contained"
            disabled
          >
            ĐÃ HỦY
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="item-list">
      {allOrder.slice(0, 30).map((order) => (
        <div className="item-order" key={order._id}>
          <div
            className="info__order__detail"
            onClick={() => handleOrderDetailPage(order._id)}
          >
            <p className="p__info__order__detail">Xem chi tiết</p>
          </div>
          <div className="orderleft">
            {(order.products || []).map((product) => (
              <div className="product-order" key={product._id}>
                <img src={product.img} alt="" />
                <div className="infoProductOrder">
                  <p style={{ fontWeight: "bolder" }}>{product.name}</p>
                  <p>
                    Số lượng: {product.count}, size: {product.size}
                  </p>
                  <p>Giá: {product.price.toLocaleString()} VNĐ</p>
                </div>
              </div>
            ))}
          </div>
          <div className="orderRight">
            <div className="Statusorder">
              <p className="addressOrder">Địa chỉ: {order.address}</p>
              <p>
                Ngày đặt hàng: {new Date(order.createdAt).toLocaleString()}{" "}
              </p>
              <p>Tổng tiền: {order.totalPrice.toLocaleString()} VNĐ</p>
            </div>
            <div className="StatusButton">
              {renderTextStatus(order.status, order._id)}
              {renderStatusButton(order.status, order._id)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllComponent;
