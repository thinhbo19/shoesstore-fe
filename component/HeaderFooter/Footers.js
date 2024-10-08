"use client";
import React from "react";
import "./Footers.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Map from "react-map-gl";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="logoFooter">
          <img src="/Logo.png" alt="Logo" />
        </div>
        <div className="footer-container">
          <div className="footer-left">
            <h2>Thông tin liên hệ</h2>
            <p>Địa chỉ: 123 Đường ABC, Thành phố XYZ</p>
            <p>Email: example@example.com</p>
            <p>Số điện thoại: (123) 456-7890</p>
          </div>
          <div className="footer-center">
            <h2>Kết nối</h2>
            <ul className="footer-links">
              <li>
                <Link href="#">
                  <FontAwesomeIcon className="icon__footer" icon={faFacebook} />{" "}
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FontAwesomeIcon
                    className="icon__footer"
                    icon={faSquareInstagram}
                  />{" "}
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#">
                  <FontAwesomeIcon className="icon__footer" icon={faLinkedin} />{" "}
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h2>Hỗ trợ</h2>
            <div className="Support">
              <div className="column">
                <Link href="/about-us">
                  <p>Về chúng tôi</p>
                </Link>

                <Link href="#">
                  <p>Chăm sóc khách hàng</p>
                </Link>
                <Link href="#">
                  <p>Hướng dẫn mua và bán hàng</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-stroke">
          <p>@2023.Hello</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
