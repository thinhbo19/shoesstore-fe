"use client";
import React from "react";
import "./Navbar.css";
import Logo from "../../public/logo.svg";
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
    router.push("/login");
  };

  return (
    <>
      <aside className="aside">
        <Link href="#Species" className="nav__logo">
          <Image src={Logo} alt="img" />
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
                  href="/dashboard/Voucher"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Voucher" ? "active" : ""
                  }`}
                >
                  Voucher
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Order"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Order" ? "active" : ""
                  }`}
                >
                  Đơn Hàng
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Users"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Users" ? "active" : ""
                  }`}
                >
                  Tài Khoản
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/News"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/News" ? "active" : ""
                  }`}
                >
                  Tin Tức
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/Statistical"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Statistical" ? "active" : ""
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
