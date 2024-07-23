"use client";
import Loading from "@/component/Loading/Loading";
import DifferentProduct from "@/component/Slider/DifferentProduct";
import ImageCollection from "@/component/Slider/ImageCollection";
import Images from "@/component/Slider/Images";
import ImageSlider from "@/component/Slider/Sliders";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("cart");
      localStorage.removeItem("cartList");
    }, 500);
  }, []);

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
    </div>
  );
};

export default HomePage;
