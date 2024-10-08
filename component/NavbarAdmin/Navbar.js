"use client";
import React from "react";
import "./Navbar.css";
import Logo from "../../assets/ád.png";
import Logout from "../../public/log-out.svg";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { setLogout } from "@/services/Redux/user/useSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();

  const HandleLogout = () => {
    dispatch(setLogout());
    router.push("/dang-nhap");
  };

  return (
    <>
      <aside className="aside">
        <Link href="#Species" className="nav__logo">
          <Image src={Logo} alt="img" width={100} height={100} />
        </Link>
        <nav className="nav">
          <div className="nav__menu__admin">
            <ul className="nav__list__admin">
              <li className="nav__item">
                <Link
                  href="/dashboard/danh-muc"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/danh-muc" ? "active" : ""
                  }`}
                >
                  Danh Mục
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/nhan-hieu"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/nhan-hieu" ? "active" : ""
                  }`}
                >
                  Nhãn Hiệu
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/san-pham"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/san-pham" ? "active" : ""
                  }`}
                >
                  Sản Phẩm
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/voucher"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/voucher" ? "active" : ""
                  }`}
                >
                  Voucher
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/don-hang"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/don-hang" ? "active" : ""
                  }`}
                >
                  Đơn Hàng
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/tai-khoan"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/tai-khoan" ? "active" : ""
                  }`}
                >
                  Tài Khoản
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/danh-sach-dang-ky"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/danh-sach-dang-ky"
                      ? "active"
                      : ""
                  }`}
                >
                  Subscribe
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/thong-ke"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/thong-ke" ? "active" : ""
                  }`}
                >
                  Thông Kê
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="CustomerMessages"
                  className={`nav__link__admin ${
                    currentPath === "CustomerMessages" ? "active" : ""
                  }`}
                >
                  Tin Nhắn
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="nav__footer">
          <Image
            className="nav__img__logout"
            src={Logout}
            alt="img"
            onClick={HandleLogout}
          />
        </div>
      </aside>
    </>
  );
};

export default Navbar;
