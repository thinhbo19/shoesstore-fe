"use client";
import React, { useEffect, useState } from "react";
import "../../../../Styles/user/ThongTinNguoiDung.css";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useSelector } from "react-redux";
import ThemDiaChi from "@/component/ThongTinUser/ThemDiaChi";
import { selectAccessToken } from "@/services/Redux/user/useSlice";

const DiaChi = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const accessToken = useSelector(selectAccessToken);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const Swal = require("sweetalert2");
  const [isDeletingAddress, setIsDeletingAddress] = useState(false);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  });

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/user/current", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      setUsername(res.data.user.username);
      setPhoneNumber(res.data.user.phoneNumber);
      setAddressList(res.data.user.Address);
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  const processAddress = (addressString) => {
    const addressParts = addressString.split(", ");
    const thanhPho = addressParts.pop();
    const huyen = addressParts.pop();
    const xa = addressParts.pop();
    const diaChiChiTiet = addressParts.join(", ");
    return {
      thanhPho,
      huyen,
      xa,
      diaChiChiTiet,
    };
  };

  const handleDeleteAddress = async (event, index) => {
    setIsDelete(true);
    setIsDeletingAddress(true);
    event.preventDefault();
    try {
      await axios.delete("http://localhost:8000/user/address", {
        headers: {
          token: `Bearer ${accessToken}`,
        },
        data: {
          index: index,
        },
      });
      Swal.fire({
        text: "Đã xóa thành công",
        showConfirmButton: false,
        timer: 1500,
        position: "top-end",
        icon: "success",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsDelete(false);
      setIsDeletingAddress(false);
    }
  };

  return (
    <div className="content-infor diachi">
      <div className="Addaddress" onClick={() => setIsAddAddressOpen(true)}>
        <button className="btn-add">
          <AddIcon sx={{ marginRight: "15px" }} />
          Thêm địa chỉ
        </button>
      </div>
      <div className="address-list">
        {Array.isArray(addressList) && addressList.length > 0 ? (
          addressList.map((address, index) => {
            const processedAddress = processAddress(address);
            return (
              <div className="addressList" key={index}>
                <div className="addressList-right">
                  <div className="rightDiaChi">
                    <p>Họ và tên: {username}</p>
                    <p>
                      Địa Chỉ: {processedAddress.diaChiChiTiet},{" "}
                      {processedAddress.xa}, {processedAddress.huyen},{" "}
                      {processedAddress.thanhPho}
                    </p>
                    <p>Số điện thoại: {phoneNumber}</p>
                  </div>
                </div>
                <div className="addressList-left">
                  <div className="addressList-left-bottom">
                    <button
                      className="btn-address"
                      onClick={(e) => handleDeleteAddress(e, index)}
                      disabled={isDeletingAddress}
                    >
                      {isDelete ? "Đang xóa....." : "Xóa"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No addresses available</p>
        )}
      </div>
      {isAddAddressOpen && (
        <ThemDiaChi
          accessToken={accessToken}
          setIsAddAddressOpen={setIsAddAddressOpen}
        />
      )}
    </div>
  );
};

export default DiaChi;
