"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./NoitificationMenu.css";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getUserCurrentCart } from "@/services/Redux/handle/hanldeUser";

const NoitificationMenu = () => {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ban đầu đặt isLoading là true để hiển thị "Loading..."
  const accessToken = useSelector(selectAccessToken);
  const [notificationCount, setNotificationCount] = useState(0);
  //   console.log(userData.Address.length);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = await getUserCurrentCart(accessToken);
        setUserData(userdata);
        // Tính số lượng thông báo
        let count = 0;
        if (userdata.Address && userdata.Address.length === 0) {
          count++;
        }
        if (!userdata.Avatar) {
          count++;
        }
        if (userdata.Cart && userdata.Cart.length === 0) {
          count++;
        }
        // Lưu số lượng thông báo vào state và localStorage
        setNotificationCount(count);
        localStorage.setItem("notificationCount", count.toString());
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setIsLoading(false); // Khi fetch hoàn thành, isLoading = false
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  // Nếu đang loading hoặc không có thông báo, hiển thị "Loading..." hoặc "Không có thông báo"
  if (isLoading || notificationCount === 0) {
    return (
      <div className="shoppingcart-products-menu">
        <div className="no-favorite">
          {isLoading ? <>Loading...</> : <span>Không có thông báo.</span>}
        </div>
      </div>
    );
  }

  // Nếu có thông báo, hiển thị danh sách thông báo
  return (
    <div className="shoppingcart-products-menu">
      <ul>
        <div className="userInfo">
          {userData.Address && userData.Address.length === 0 ? (
            <li>
              {" "}
              <p>Bạn chưa cập nhật địa chỉ</p>{" "}
            </li>
          ) : null}
          {userData.Avatar ? null : (
            <li>
              <p>Bạn chưa cập nhật Avatar</p>
            </li>
          )}
          {userData.Cart && userData.Cart.length === 0 ? (
            <li>
              <p>Bạn chưa thêm sản phẩm vào giỏ hàng</p>
            </li>
          ) : null}
        </div>
      </ul>
    </div>
  );
};

export default NoitificationMenu;
