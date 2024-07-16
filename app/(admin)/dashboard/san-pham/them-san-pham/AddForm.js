"use client";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { Editor } from "@tinymce/tinymce-react";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import InsertLeft from "./InsertLeft";
import "./SanPhamAdmin.css";
import axios from "axios";
import Loading from "@/component/Loading/Loading";
import { useRouter } from "next/navigation";

const AddForm = ({ brand, Category }) => {
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");
  const [productName, setProductName] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCate, setSelectedCate] = useState("");
  const [htmlDescription, setHtmlDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState([
    { size: 36, numberOfSize: 0 },
    { size: 37, numberOfSize: 0 },
    { size: 38, numberOfSize: 0 },
    { size: 39, numberOfSize: 0 },
    { size: 40, numberOfSize: 0 },
    { size: 41, numberOfSize: 0 },
    { size: 42, numberOfSize: 0 },
  ]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const editorRef = useRef(null);
  const router = useRouter();

  const handleChangeBrand = (e) => {
    setSelectedBrand(e.target.value);
  };
  const handleChangeCate = (e) => {
    setSelectedCate(e.target.value);
  };
  const handleSizeChange = (size, value) => {
    const parsedValue = parseInt(value, 10) || 0;
    const updatedSizes = quantity.map((item) =>
      item.size === size ? { ...item, numberOfSize: parsedValue } : item
    );
    setQuantity(updatedSizes);
  };
  const handleImageChange = (event) => {
    const imageFiles = event.target.files;
    setSelectedImages(imageFiles);
  };
  const handleDeleteImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleThemSanPham = async () => {
    if (
      !productName ||
      !htmlDescription ||
      !selectedBrand ||
      !price ||
      !accessToken
    ) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin sản phẩm",
      });
      return;
    }
    const confirmResult = await Swal.fire({
      title: "Xác nhận",
      text: "Bạn có chắc chắn muốn thêm sản phẩm?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", htmlDescription);
    formData.append("brand", selectedBrand);
    formData.append("category", selectedCate);
    formData.append("price", price);
    quantity.forEach((item, index) => {
      formData.append(`quantity[${index}][size]`, item.size);
      formData.append(`quantity[${index}][numberOfSize]`, item.numberOfSize);
    });
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("img", selectedImages[i]);
    }
    try {
      const res = await axios.post("http://localhost:8000/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: `Bearer ${accessToken}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Đã thêm sản phẩm thành công",
      });
      console.log(res);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi khi thêm sản phẩm",
        text: error.message || "Đã xảy ra lỗi không xác định",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push("/dashboard/san-pham");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="right-main">
      <div className="add_heading">
        <h2 className="add_title">Thêm Sản Phẩm</h2>
      </div>
      <div className="insert-sanpham">
        <InsertLeft
          handleImageChange={handleImageChange}
          selectedImages={selectedImages}
          handleDeleteImage={handleDeleteImage}
        />
        <div className="insertRight">
          <div className="fieldInput">
            <div className="pInsert">
              <p>- Nhập tên sản phẩm</p>
              <p style={{ color: "red" }}>*</p>
              <p>:</p>
            </div>
            <input
              className="input-danhmuc"
              type="text"
              placeholder="Nhập tên sản phẩm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>

          <div className="fieldInput">
            <div className="pInsert">
              <p>- Chọn danh mục</p>
              <p style={{ color: "red" }}>*</p>
              <p>:</p>
            </div>
            <select
              className="select-danhmuc"
              value={selectedCate}
              onChange={handleChangeCate}
            >
              <option value="">Chọn Danh Mục</option>
              {Category.map((cateItem) => (
                <option key={cateItem._id} value={cateItem._id}>
                  {cateItem.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="fieldInput">
            <div className="pInsert">
              <p>- Chọn nhãn hiệu</p>
              <p style={{ color: "red" }}>*</p>
              <p>:</p>
            </div>
            <select
              className="select-danhmuc"
              value={selectedBrand}
              onChange={handleChangeBrand}
            >
              <option value="">Chọn Nhãn Hiệu</option>
              {brand.map((brandItem) => (
                <option key={brandItem._id} value={brandItem._id}>
                  {brandItem.brandName}
                </option>
              ))}
            </select>
          </div>

          <div className="fieldInput">
            <div className="pInsert">
              <p>- Nhập giá sản phẩm</p>
              <p style={{ color: "red" }}>*</p>
              <p>:</p>
            </div>
            <input
              className="input-danhmuc"
              type="number"
              placeholder="Nhập giá sản phẩm"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="fieldInput">
            <div className="pInsert">
              <p>- Số lượng sản phẩm</p>
              <p style={{ color: "red" }}>*</p>
              <p>:</p>
            </div>
            {quantity.map((sizeItem) => (
              <div key={sizeItem.size} className="quantityField">
                <p className="sizeField">{sizeItem.size}</p>
                <input
                  className="input-quantity"
                  type="number"
                  placeholder="Nhập số lượng"
                  value={sizeItem.numberOfSize}
                  onChange={(e) =>
                    handleSizeChange(sizeItem.size, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="decriptionField">
        <div className="pInsert">
          <p>- Mô tả sản phẩm</p>
          <p style={{ color: "red" }}>*</p>
          <p>:</p>
        </div>
        <Editor
          value={htmlDescription}
          onEditorChange={(content) => {
            setHtmlDescription(content);
          }}
          apiKey="06txmbmjzqjj2tbcgqgwvs8xzubupbhjzun5zodh0as2q07u"
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>
      <div className="btn-bottom">
        <button className="exit-btn" onClick={() => handleGoBack()}>
          TRỞ VỀ
        </button>
        <button className="save-btn" onClick={handleThemSanPham}>
          THÊM SẢN PHẨM
        </button>
      </div>
    </div>
  );
};

export default AddForm;
