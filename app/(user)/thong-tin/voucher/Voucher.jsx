"use client";
import React, { useEffect, useState } from "react";
import "../../../../Styles/user/ThongTinNguoiDung.css";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import voucherSV from "../../../../assets/voucher.png";
import { useSelector } from "react-redux";
import { getUserCurrent } from "@/services/Redux/handle/hanldeUser";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { getAllVoucher } from "@/services/Redux/fetchData/useFetchData";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { removeVoucher } from "@/services/Redux/handle/hanldeVoucher";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Voucher = () => {
  const [freeShipVoucher, setFreeShipVoucher] = useState([]);
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  const fetchData = async () => {
    if (accessToken) {
      try {
        const resUser = await getUserCurrent(accessToken);
        const res = await getAllVoucher();

        const voucherInUser = resUser.Coupon;
        const voucherRes = res;
        const freeShipVouchers = voucherRes.filter((voucher) =>
          voucherInUser.includes(voucher._id)
        );
        setFreeShipVoucher(freeShipVouchers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const handleRemoveVoucher = async (cpid) => {
    try {
      await removeVoucher(accessToken, cpid);
      fetchData();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  return (
    <div className="content-infor voucher">
      {accessToken ? (
        <Box sx={{ width: "100%" }}>
          <Stack direction="row" useFlexGap flexWrap="wrap" spacing={5}>
            {freeShipVoucher.map((coupon, index) => (
              <Item
                key={index}
                sx={{
                  width: 300,
                  height: 100,
                  background: "transition",
                  display: "flex",
                  position: "relative",
                }}
              >
                <FontAwesomeIcon
                  icon={faX}
                  className="icon-remove"
                  onClick={() => handleRemoveVoucher(coupon._id)}
                />
                <Image
                  style={{ width: "35%", height: "100%" }}
                  src={voucherSV}
                  alt="Voucher"
                />{" "}
                <div className="info-coupon">
                  <p
                    style={{
                      fontSize: "1rem",
                      textAlign: "left",
                      margin: "0",
                      fontWeight: "bold",
                    }}
                  >
                    {coupon.name}
                  </p>
                  <p
                    style={{ fontSize: "1rem", textAlign: "left", margin: "0" }}
                  >
                    Giá trị: {coupon.exclusive.toLocaleString()} VNĐ
                  </p>
                  <p
                    style={{ fontSize: "1rem", textAlign: "left", margin: "0" }}
                  >
                    Giảm: {coupon.discount}%
                  </p>
                  <p style={{ color: "red", margin: "0" }}>
                    Ngày hết hạn: {new Date(coupon.expiry).toLocaleDateString()}
                  </p>
                </div>
              </Item>
            ))}
          </Stack>
        </Box>
      ) : (
        <h3 style={{ fontSize: "1.4rem", margin: "0" }}>BẠN CHƯA ĐĂNG NHẬP</h3>
      )}
    </div>
  );
};

export default Voucher;
