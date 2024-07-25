"use client";
import React, { useEffect, useState } from "react";
import "../../../../Styles/user/OrderDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getOrderDetail } from "@/services/Redux/api";
import OrderDetailProd from "@/component/OrderDetailComp/OrderDetailProd";
import OrderDetailUser from "@/component/OrderDetailComp/OrderDetailUser";
import { getUserById } from "@/services/Redux/handle/hanldeUser";

const OrderDetail = ({ orderId }) => {
  const accessToken = useSelector(selectAccessToken);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderDetail(accessToken, orderId);

        const userCur = await getUserById(accessToken, res.OrderBy);
        setProducts(res.products);
        setTotalPrice(res.totalPrice.toLocaleString());
        setUser(userCur);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [accessToken, orderId]);

  const calculateTotalCount = (products) => {
    return products.reduce((total, prod) => total + prod.count, 0);
  };

  return (
    <div className="order__detail">
      <OrderDetailUser user={user} />
      <OrderDetailProd
        products={products}
        dispatch={dispatch}
        totalPrice={totalPrice}
        calculateTotalCount={calculateTotalCount}
      />
    </div>
  );
};

export default OrderDetail;
