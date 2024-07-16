import React from "react";
import "./ControlHis.css";
import { renderTextStatus } from "./SettingOrder";
import { Button } from "@mui/material";
import axios from "axios";

const CompleteComponent = ({ accessToken, successOrder }) => {
  const Swal = require("sweetalert2");

  const hanleToRating = (productId) => {};

  const renderStatusButton = (status) => {
    switch (status) {
      // case "Success":
      //   return (
      //     <Button
      //       // onClick={() => handlePutStatus(oid, "Success")}
      //       sx={{
      //         width: "150px",
      //         backgroundColor: "#ee8d2d",
      //         "&:hover": {
      //           backgroundColor: "#ee8d2d",
      //         },
      //       }}
      //       variant="contained"
      //     >
      //       ĐÁNH GIÁ
      //     </Button>
      //   );
      default:
        return null;
    }
  };

  return (
    <div className="item-list">
      {successOrder.slice(0, 30).map((order) => (
        <div className="item-order" key={order._id}>
          <div className="orderleft">
            {(order.products || []).map((product) => (
              <div className="product-order" key={product._id}>
                <img src={product.img} alt="" />
                <div className="infoProductOrder">
                  <p>{product.name}</p>
                  <p>Số lượng: {product.count}</p>
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
              {renderTextStatus(order.status)}
              {renderStatusButton(order.status)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompleteComponent;
