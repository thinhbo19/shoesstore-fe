"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../Styles/user/ThanhToan.css";
import Pay from "../../../component/Pay/Pay";
import voucherSV from "../../../assets/voucher.png";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../../../component/Loading/Loading";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getVouchers } from "@/services/Redux/handle/hanldeVoucher";
import { useRouter } from "next/navigation";
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";
import Image from "next/image";

const ThanhToan = () => {
  const accessToken = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(true);
  const Swal = require("sweetalert2");
  const [addressList, setAddressList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [username, setUsername] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPriceVoucher, setTotalVoucher] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [voucher, setVoucher] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [note, setNote] = useState("");
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("");
  const getCartData = () => {
    const cartData = localStorage.getItem("cartList");
    return cartData ? JSON.parse(cartData) : [];
  };
  const cartData = getCartData();

  const fetchDataUser = async () => {
    try {
      const resVoucherArr = await getVouchers();
      const res = await getUserCurrent(accessToken);

      const voucherArrInUser = res.Coupon;
      setUsername(res.username);
      setPhoneNumber(res.phoneNumber);
      setAddressList(res.Address);

      const commonVouchers = resVoucherArr.filter((voucher) =>
        voucherArrInUser.some((userVoucher) => userVoucher.id === voucher.id)
      );
      setVoucher(commonVouchers);

      const total = cartData.reduce(
        (acc, cartItem) => acc + cartItem.price * cartItem.count,
        0
      );

      setTotalAmount(total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      fetchDataUser();
    }, 1500);
  }, [accessToken]);

  const handleSelectDiaChi = () => {
    if (addressList.length === 0) {
      Swal.fire({
        title: "BẠN CHƯA THÊM ĐỊA CHỈ",
        icon: "info",
      });
      return;
    }

    Swal.fire({
      title: "Chọn Địa Chỉ",
      html:
        '<select id="addressSelect" className="swal2-input">' +
        '<option value="">-- Chọn Địa Chỉ --</option>' +
        addressList
          .map(
            (address, index) => `<option value="${index}">${address}</option>`
          )
          .join("") +
        "</select>",
      showCancelButton: true,
      confirmButtonText: "Chọn",
      cancelButtonText: "Hủy bỏ",
      preConfirm: () => {
        const selectedAddressIndex =
          document.getElementById("addressSelect").value;

        if (!selectedAddressIndex) {
          Swal.showValidationMessage("Vui lòng chọn một địa chỉ!");
        }

        const selectedAddress = addressList[selectedAddressIndex];

        return selectedAddress;
      },
    }).then((result) => {
      if (!result.isDismissed) {
        setSelectedAddress(result.value);
      }
    });
  };

  const handleCashOnDeliveryChange = () => {
    setPaymentMethod("cashOnDelivery");
  };

  const handlePayWithCardChange = () => {
    setPaymentMethod("payWithCard");
  };

  const handleSelectVoucher = () => {
    const eligibleVouchers = voucher.filter(
      (voucher) =>
        voucher.exclusive !== null && voucher.exclusive <= totalAmount
    );

    if (eligibleVouchers.length === 0) {
      Swal.fire({
        title: "Không có voucher phù hợp",
        icon: "info",
      });
      return;
    }

    Swal.fire({
      title: "Chọn Voucher",
      html:
        '<select id="voucherSelect" className="swal2-input">' +
        '<option value="">-- Chọn Voucher --</option>' +
        eligibleVouchers
          .map(
            (voucher) =>
              `<option value="${voucher._id}">${voucher.name} - ${voucher.discount}% Giảm giá</option>`
          )
          .join("") +
        "</select>",
      showCancelButton: true,
      confirmButtonText: "Chọn",
      cancelButtonText: "Hủy bỏ",
      preConfirm: () => {
        const voucherId = document.getElementById("voucherSelect").value;
        const selectedVoucher = voucher.find(
          (voucher) => voucher._id === voucherId
        );

        if (selectedVoucher) {
          setTotalVoucher(
            totalAmount -
              (totalAmount - (totalAmount * selectedVoucher.discount) / 100)
          );
          setSelectedVoucher(selectedVoucher);
        }

        return selectedVoucher;
      },
    });
  };

  const handleThanhToan = async () => {
    if (!selectedAddress) {
      Swal.fire({
        title: "BẠN CHƯA CHỌN ĐỊA CHỈ",
        icon: "warning",
      });
      return;
    }
    try {
      const createOrderResponse = await axios.post(
        "http://localhost:8000/order/copy",
        {
          products: cartData.map((selectedProduct) => ({
            product: selectedProduct.product,
            size: selectedProduct.size,
            count: selectedProduct.count,
            price: selectedProduct.price,
            img: selectedProduct.img,
            name: selectedProduct.name,
          })),
          Note: note,
          address: selectedAddress,
          coupon: selectedVoucher ? selectedVoucher._id : null,
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      const orderId = createOrderResponse.data.response._id;
      await axios.put(
        `http://localhost:8000/order/status/${orderId}`,
        {
          status: "Processing",
        },
        { headers: { token: `Bearer ${accessToken}` } }
      );

      Swal.fire({
        title: "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG",
        icon: "success",
      });
      for (const product of cartData) {
        await axios.delete(
          `http://localhost:8000/user/Cart/${product.product}/${product.size}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
      }
      Swal.fire({
        title: "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG",
        icon: "success",
      });
      localStorage.removeItem("cartList");
      router.push("/thong-tin/lich-su-mua-hang");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCartItem = async (productId, size) => {
    try {
      const result = await Swal.fire({
        title: "Bạn có chắc chắn muốn xóa sản phẩm này?",
        text: "Sản phẩm sẽ bị xóa khỏi giỏ hàng!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Đồng ý",
        cancelButtonText: "Hủy bỏ",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `http://localhost:8000/user/Cart/${productId}/${size}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
        Swal.fire({
          title: "Đã Xóa Thành Công!!!",
          icon: "success",
        });
        localStorage.removeItem("cartList");
        fetchDataUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const money = ((totalAmount - totalPriceVoucher) / 24250).toFixed(2);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="thanhtoan">
      <div className="thanhtoansecond">
        <div className="thanhtoanleft">
          <div className="thanhtoanleft-main">
            <div className="main-1">
              <h3 style={{ color: "#ee4d2d", fontWeight: "bold" }}>
                THANH TOÁN
              </h3>
            </div>
            <div className="main-2">
              <div className="choseAddress">
                <button
                  className="btnchoseAddress"
                  onClick={handleSelectDiaChi}
                >
                  Chọn Địa Chỉ
                </button>
              </div>
              {selectedAddress ? (
                <div className="addressField">
                  <div className="addressFieldRight">
                    <div className="infoaddress">
                      <p className="address-left">Họ tên: </p>
                      <p className="address">{username}</p>
                    </div>
                    <div className="infoaddress">
                      <p className="address-left">Điện Thoại: </p>
                      <p className="address"> {phoneNumber}</p>
                    </div>
                    <div className="infoaddress">
                      <p className="address-left">Địa chỉ: </p>
                      <p className="address">{selectedAddress}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="addressField">
                  <p className="noaddress">Bạn chưa chọn địa chỉ</p>
                </div>
              )}
            </div>
            <div className="main-3">
              <div className="large-input-container">
                <label htmlFor="largeInput">Ghi chú:</label>
                <textarea
                  id="largeInput"
                  placeholder="Ghi ở đây..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <div className="main-5">
              <button className="payCart" onClick={handleSelectVoucher}>
                Chọn Voucher
              </button>
              {selectedVoucher ? (
                <div className="voucherischoose">
                  <div
                    key={selectedVoucher._id}
                    className="voucher-list-container"
                  >
                    <Image src={voucherSV} alt="voucher" />
                    <div className="voucher-list-container-information">
                      <label>Giảm tối thiểu {selectedVoucher.discount}%</label>
                      <br />
                      <label>Đơn tối thiểu {selectedVoucher.exclusive}Đ</label>
                      <br />
                      <label style={{ color: "red" }}>
                        Hết hạn:{" "}
                        {new Date(selectedVoucher.expiry).toLocaleDateString()}
                      </label>{" "}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="voucherischoose">
                  <p className="noaddress">Chưa chọn Voucher</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="thanhtoanright">
          <div className="thanhtoanright-top">
            <p
              style={{ width: "55%", textAlign: "center", fontSize: "1.2rem" }}
            >
              Sản Phẩm ({cartData.length === 0 ? "0" : cartData.length} sản
              phẩm)
            </p>
            <p
              style={{ width: "25%", textAlign: "center", fontSize: "1.2rem" }}
            >
              Số Lượng
            </p>
            <p
              style={{ width: "20%", textAlign: "center", fontSize: "1.2rem" }}
            >
              Giá
            </p>
          </div>
          <div className="thanhtoanright-bottom">
            {cartData.map((item) => (
              <div key={item._id} className="itemProductOrder">
                <div key={item._id} className="bottom1">
                  <DeleteIcon
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      height: "100%",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      handleDeleteCartItem(item.product, item.size)
                    }
                  />
                  <img src={item.img} alt="" />
                  <div className="bottom1Right">
                    <p
                      className="item__payment"
                      style={{ fontSize: "1rem", fontWeight: "bold" }}
                    >
                      {item.name}
                    </p>
                    <p style={{ fontSize: "1rem" }}>Size: {item.size}</p>
                  </div>
                </div>
                <div className="bottom2">
                  <p style={{ fontSize: "1rem" }}>{item.count} Đôi</p>
                </div>
                <div className="bottom3">
                  <p style={{ fontSize: "1.1rem", color: "#ee4d2d" }}>
                    {item.price.toLocaleString()} VNĐ
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="thanhtoanrightLast">
            <div className="thanhtoanrightLast-1">
              <div className="cost1">
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Tổng tiền:{" "}
                </p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>Giảm: </p>
                <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                  Tổng cộng:{" "}
                </p>
              </div>
              <div className="cost2">
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#ee4d2d",
                  }}
                >
                  {totalAmount.toLocaleString()} VNĐ
                </p>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#ee4d2d",
                  }}
                >
                  {totalPriceVoucher.toLocaleString()} VNĐ
                </p>
                <p
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "#ee4d2d",
                  }}
                >
                  {(totalAmount - totalPriceVoucher).toLocaleString()} VNĐ
                </p>
              </div>
            </div>
            <div className="thanhtoanrightLast-2">
              <div style={{ margin: "10px" }}>
                <Pay
                  payload={{
                    products: cartData,
                    address: selectedAddress,
                    Note: note,
                    coupon: selectedVoucher,
                    totalPrice: { money },
                  }}
                  amount={money}
                />
              </div>
              <button className="btnPayment" onClick={handleThanhToan}>
                Thanh Toán Khi Nhận Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
