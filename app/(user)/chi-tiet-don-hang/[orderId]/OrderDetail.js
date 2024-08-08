"use client";
import React, { useEffect, useState } from "react";
import "../../../../Styles/user/OrderDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getOrderDetail } from "@/services/Redux/api";
import OrderDetailProd from "@/component/OrderDetailComp/OrderDetailProd";
import OrderDetailUser from "@/component/OrderDetailComp/OrderDetailUser";
import { getUserById } from "@/services/Redux/handle/hanldeUser";
import Loading from "@/component/Loading/Loading";

const returnValue = (status) => {
  switch (status) {
    case "Processing":
      return "Đang xử lý";
    case "Shipping":
      return "Đang vận chuyển";
    case "Success":
      return "Thành công";
    case "Cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

const hanldePaymentMethod = (paymentMethod) => {
  switch (paymentMethod) {
    case "PayPal":
      return "PayPal";
    case "ZaloPay":
      return "ZaloPay";
    case "PaymentDelivery":
      return "COD";
    default:
      return paymentMethod;
  }
};

const OrderDetail = ({ orderId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [orderData, setOrderData] = useState(null);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderDetail(accessToken, orderId);
        setOrderData(res);
        const userCur = await getUserById(accessToken, res.OrderBy);
        setUser(userCur);
      } catch (error) {
        console.error(error);
      }
    };
    if (accessToken && orderId) {
      fetchData();
    }
  }, [accessToken, orderId]);

  const calculateTotalCount = (products) => {
    return products?.reduce((total, prod) => total + prod.count, 0);
  };

  if (!orderData || !user) {
    return <Loading />;
  }

  return (
    <div className="order__detail">
      <OrderDetailUser
        user={user}
        address={orderData?.address}
        paymentMethod={hanldePaymentMethod(orderData?.paymentMethod)}
        status={orderData?.status}
        returnValue={returnValue}
        createdAt={orderData?.createdAt}
        updatedAt={orderData?.updatedAt}
      />
      <OrderDetailProd
        products={orderData?.products}
        dispatch={dispatch}
        totalPrice={orderData?.totalPrice.toLocaleString()}
        calculateTotalCount={calculateTotalCount}
      />
    </div>
  );
};

export default OrderDetail;
