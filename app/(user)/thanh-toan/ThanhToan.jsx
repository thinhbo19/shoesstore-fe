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
import { apiUrlOrder, apiUrlUser } from "@/services/config";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CustomButton = styled(Button)({
  backgroundColor: "#ee4d2d",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#f28e7a",
  },
  padding: "10px 20px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "16px",
  height: "50px",
});

const CustomButtonCod = styled(Button)({
  backgroundColor: "#ee4d2d",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#f28e7a",
  },
  padding: "10px 20px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "16px",
  height: "50px",
  margin: "10px 0",
  width: "100%",
});

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
  const [isCodEnabled, setIsCodEnabled] = useState(false);
  const [isElectronicEnabled, setIsElectronicEnabled] = useState(false);
  const money = selectedVoucher ? totalPriceVoucher : totalAmount;

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

  const handleSelectVoucher = (event) => {
    const voucherId = event.target.value;
    const selectedVoucher = voucher.find(
      (voucher) => voucher._id === voucherId
    );

    if (selectedVoucher) {
      const discountAmount = (totalAmount * selectedVoucher.discount) / 100;
      setTotalVoucher(totalAmount - discountAmount);
      setSelectedVoucher(voucherId);
    }
  };

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

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "cod") {
      setIsCodEnabled(true);
      setIsElectronicEnabled(false);
    } else if (method === "electronic") {
      setIsCodEnabled(false);
      setIsElectronicEnabled(true);
    }
  };

  const handleThanhToan = async () => {
    if (!selectedAddress) {
      Swal.fire({ title: "BẠN CHƯA CHỌN ĐỊA CHỈ", icon: "warning" });
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${apiUrlOrder}/copy`,
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
          status: "Processing",
          paymentMethod: "PaymentDelivery",
          paymentStatus: "UnPaid",
        },
        { headers: { token: `Bearer ${accessToken}` } }
      );
      for (const product of cartData) {
        await axios.delete(
          `${apiUrlUser}/Cart/${product.product}/${product.size}`,
          { headers: { token: `Bearer ${accessToken}` } }
        );
      }
      localStorage.removeItem("cartList");
      router.push("/thong-tin/lich-su-mua-hang");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      Swal.fire({ title: "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG", icon: "success" });
    }
  };

  const handleThanhToanPayPal = async () => {
    if (!selectedAddress) {
      Swal.fire({ title: "BẠN CHƯA CHỌN ĐỊA CHỈ", icon: "warning" });
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${apiUrlOrder}/copy`,
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
          status: "Processing",
          paymentMethod: "PayPal",
          paymentStatus: "Paid",
        },
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );
      for (const product of cartData) {
        await axios.delete(
          `${apiUrlUser}/Cart/${product.product}/${product.size}`,
          {
            headers: {
              token: `Bearer ${accessToken}`,
            },
          }
        );
      }

      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
      router.push("/thong-tin/lich-su-mua-hang");
    } catch (error) {
      console.log(error);
    } finally {
      Swal.fire({
        title: "BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG",
        icon: "success",
      });
      setLoading(false);
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
        await axios.delete(`${apiUrlUser}/Cart/${productId}/${size}`, {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        });
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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="thanhtoan__container">
      <div className="thanhtoan__main">
        <div className="thanhtoan__productlist">
          <div className="thanhtoan__productlist__header">
            <p className="thanhtoan__p">
              SỐ LƯỢNG SẢN PHẨM: {cartData.length} đôi{" "}
            </p>
          </div>
          <div className="thanhtoan__productitem">
            {cartData.map((item) => (
              <div key={item._id} className="item__product">
                <Image
                  className="img__product"
                  src={item.img}
                  alt={item.name}
                  width={80}
                  height={80}
                />
                <div className="item__product__info">
                  <p className="item_name">{item.name}</p>
                  <p className="item_price">
                    {item.price.toLocaleString()} VNĐ
                  </p>
                  <p className="item_count">{item.count} đôi</p>
                </div>
                <DeleteIcon
                  className="icon_item"
                  onClick={() => handleDeleteCartItem(item.product, item.size)}
                />
              </div>
            ))}
          </div>
          <div className="thanhtoan__price">
            <div className="voucher__item">
              <Select
                value={selectedVoucher}
                onChange={handleSelectVoucher}
                displayEmpty
                inputProps={{ "aria-label": "Select Voucher" }}
                style={{ width: "200px", marginLeft: "10px" }}
              >
                <MenuItem value="">
                  <em>Chọn Voucher</em>
                </MenuItem>
                {voucher.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name} - {item.discount}% Giảm giá
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className="price__item">
              <p className="price__item__p">
                Tổng tiền:{" "}
                <p className="priceAnount">
                  {totalAmount.toLocaleString()} VNĐ
                </p>
              </p>
              <p className="price__item__p">
                Giảm:
                <p className="priceAnount">
                  {(totalAmount - totalPriceVoucher).toLocaleString()} VNĐ
                </p>
              </p>
              <p className="price__item__p">
                Tổng cộng:
                <p className="priceAnount">
                  {totalPriceVoucher.toLocaleString()} VNĐ{" "}
                </p>
              </p>
            </div>
          </div>
        </div>
        <div className="thanhtoan__info">
          <div className="thanhtoan__diachi">
            <CustomButton onClick={handleSelectDiaChi}>
              Chọn địa chỉ
            </CustomButton>
            {selectedAddress ? (
              <div className="addressField">
                <p className="address">Tên: {username}</p>
                <p className="address">Số điện thoại: {phoneNumber}</p>
                <p className="address">Địa chỉ: {selectedAddress}</p>
              </div>
            ) : (
              <div className="addressField">
                <p className="noaddress">Bạn chưa chọn địa chỉ</p>
              </div>
            )}
          </div>
          <div className="thanhtoan__note">
            <p className="title__note">Lưu ý: </p>
            <textarea
              className="note__area"
              id="largeInput"
              placeholder="Ghi ở đây..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="thanhtoan__pay">
            <p className="thanhtoan__pay__title">PHƯƠNG THỨC THANH TOÁN</p>
            <div className="thanhtoan__pay__method">
              <div className="thanhtoan__pay__method__left">
                <div className="method__item">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paymentMethod === "cod"}
                        onChange={() => handlePaymentMethodChange("cod")}
                        {...label}
                      />
                    }
                    label="Thanh toán khi nhận hàng"
                  />
                </div>
                <div className="method__item">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={paymentMethod === "electronic"}
                        onChange={() => handlePaymentMethodChange("electronic")}
                        {...label}
                      />
                    }
                    label="Thanh toán điện tử"
                  />
                </div>
              </div>
              <div className="thanhtoan__pay__method__right">
                {isCodEnabled && (
                  <CustomButtonCod onClick={() => handleThanhToan()}>
                    Thanh Toán Khi Giao Hàng
                  </CustomButtonCod>
                )}
                <Pay
                  isElectronicEnabled={isElectronicEnabled}
                  paymentSuccess={handleThanhToanPayPal}
                  amount={Math.round(money / 25000)}
                  currency={"USD"}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThanhToan;
