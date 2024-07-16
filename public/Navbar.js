"use client";
import React from "react";
import "./Navbar.css";
import Logo from "../../../public/logo.svg";
import Logout from "../../../public/log-out.svg";
import { useDispatch } from "react-redux";
import { setLogout } from "@/src/services/Redux/useSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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
                  href="/dashboard/Species"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Species" ? "active" : ""
                  }`}
                >
                  Species
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/Breeds"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Breeds" ? "active" : ""
                  }`}
                >
                  Breeds
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/Pets"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Pets" ? "active" : ""
                  }`}
                >
                  Pets
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Category"
                  className={`nav__link__admin ${
                    location.hash === "/dashboard/Category" ? "active" : ""
                  }`}
                >
                  Category
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/Brands"
                  className={`nav__link__admin ${
                    location.hash === "/dashboard/Brands" ? "active" : ""
                  }`}
                >
                  Brands
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Products"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Products" ? "active" : ""
                  }`}
                >
                  Products
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Voucher"
                  className={`nav__link__admin ${
                    location.hash === "/dashboard/Voucher" ? "active" : ""
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
                  Order
                </Link>
              </li>

              <li className="nav__item">
                <Link
                  href="/dashboard/Users"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Users" ? "active" : ""
                  }`}
                >
                  Users
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/News"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/News" ? "active" : ""
                  }`}
                >
                  News
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="/dashboard/Statistical"
                  className={`nav__link__admin ${
                    currentPath === "/dashboard/Statistical" ? "active" : ""
                  }`}
                >
                  Statistical
                </Link>
              </li>
              <li className="nav__item">
                <Link
                  href="CustomerMessages"
                  className={`nav__link__admin ${
                    location.hash === "CustomerMessages" ? "active" : ""
                  }`}
                >
                  Chats
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
