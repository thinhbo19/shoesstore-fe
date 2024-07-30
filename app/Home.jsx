"use client";
import Loading from "@/component/Loading/Loading";
import DifferentProduct from "@/component/Slider/DifferentProduct";
import ImageCollection from "@/component/Slider/ImageCollection";
import Images from "@/component/Slider/Images";
import ImageSlider from "@/component/Slider/Sliders";
import React, { useEffect, useState } from "react";
import PopupMailChimp from "@/component/popup-mailchimp/PopupMailChimp";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
      setPopup(true);
    }, 500);
  }, []);

  const handlePopup = () => {
    setPopup(!popup);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <ImageSlider />
      <div>
        <Images />
      </div>
      <div>
        <ImageCollection />
      </div>
      <>
        <div className="different-product">
          <h3
            style={{
              fontStyle: "bold",
              textAlign: "left",
              marginTop: "50px",
              textAlignLast: "center",
            }}
          >
            CÓ THỂ BẠN SẼ THÍCH
          </h3>
          <DifferentProduct />
        </div>
      </>
      {popup ? <PopupMailChimp handlePopup={handlePopup} /> : null}
    </div>
  );
};

export default HomePage;
