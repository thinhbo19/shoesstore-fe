import React from "react";
import leftimagebottom from "../../assets/leftimagebottom.png";
import middleimagebottom from "../../assets/middleimagebottom.png";
import rightimagebottom from "../../assets/rightimagebottom.png";
import "./Images.css";
import Link from "next/link";
import Image from "next/image";

const ImageCollection = () => {
  return (
    <div className="Image-collection">
      <div className="Image-collection-left">
        <Image src={leftimagebottom} alt="" />
      </div>
      <div className="Image-collection-middle">
        <Link href="#">Bộ sưu tập</Link>
        <br />
        <Image src={middleimagebottom} alt="" />
      </div>
      <div className="Image-collection-right">
        <Image src={rightimagebottom} alt="" />
      </div>
    </div>
  );
};

export default ImageCollection;
