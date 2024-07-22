"use client";
import { selectAccessToken } from "@/services/Redux/user/useSlice";
import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./SanPhamAdmin.css";
import "./EditSanPham.css";
import axios from "axios";
import { usePathname } from "next/navigation";
import { getOneProduct } from "@/services/Redux/api";
import Loading from "@/component/Loading/Loading";

const EditForm = () => {
  const accessToken = useSelector(selectAccessToken);
  const Swal = require("sweetalert2");
  const pathName = usePathname();
  const productId = pathName.split("/").pop();
  const [quantity, setQuantity] = useState([
    { size: 36, numberOfSize: 0 },
    { size: 37, numberOfSize: 0 },
    { size: 38, numberOfSize: 0 },
    { size: 39, numberOfSize: 0 },
    { size: 40, numberOfSize: 0 },
    { size: 41, numberOfSize: 0 },
    { size: 42, numberOfSize: 0 },
  ]);
  const [imgProduct, setImgProduct] = useState([]);
  const [productEdit, setProductEdit] = useState({
    productName: "",
    price: "",
    quantity: quantity,
    description: "",
    images: [],
  });
  const editorRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOneProduct(productId);
        const productData = res[0];

        if (productData) {
          setProductEdit(productData);
          setImgProduct(productData.images);
          setQuantity(productData.quantity);
        } else {
          console.error("Không tìm thấy sản phẩm với ID tương ứng");
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm", error);
      }
    };

    fetchData();
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  const handleSizeChange = (size, value) => {
    const parsedValue = parseInt(value, 10) || 0;
    setProductEdit((prevProductEdit) => {
      const updatedQuantity = prevProductEdit.quantity.map((item) =>
        item.size === size ? { ...item, numberOfSize: parsedValue } : item
      );

      return {
        ...prevProductEdit,
        quantity: updatedQuantity,
      };
    });
  };

  const handleSaveEdit = async () => {
    setIsSaving(true);
    if (
      !productEdit.productName ||
      !productEdit.description ||
      !productEdit.price ||
      !accessToken
    ) {
      Swal.fire({
        icon: "error",
        title: "Vui lòng điền đầy đủ thông tin sản phẩm",
      });
      setIsSaving(false);
      return;
    }
    const formData = new FormData();
    formData.append("productName", productEdit.productName);
    formData.append("description", productEdit.description);
    formData.append("price", productEdit.price);
    productEdit.quantity.forEach((item, index) => {
      formData.append(`quantity[${index}][size]`, item.size);
      formData.append(`quantity[${index}][numberOfSize]`, item.numberOfSize);
    });
    for (let i = 0; i < productEdit.images.length; i++) {
      formData.append("images", productEdit.images[i]);
    }
    try {
      const res = await axios.put(
        `http://localhost:8000/product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${accessToken}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Đã chỉnh sửa sản phẩm thành công",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Có lỗi xảy ra khi chỉnh sửa sản phẩm",
        text: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageChange = (index, event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const updatedImgProduct = [...imgProduct];
      const imageURL = URL.createObjectURL(files[0]);
      updatedImgProduct[index] = imageURL;
      setImgProduct(updatedImgProduct);
      const updatedProductEditImages = [...productEdit.images];
      updatedProductEditImages[index] = files[0];
      setProductEdit((prev) => ({
        ...prev,
        images: updatedProductEditImages,
      }));
    }
  };

  return (
    <div className="formEditSanPham">
      <div className="main-content">
        <div className="header">
          <h2>SỬA SẢN PHẨM</h2>
        </div>
        <div className="contentEdit">
          <div className="left-content">
            <div className="pInsert">
              <p>- Hình ảnh sản phẩm: </p>
            </div>
            <div className="imgEdit">
              {Array.isArray(imgProduct) &&
                imgProduct.length > 0 &&
                imgProduct.map((img, index) => (
                  <div key={index} className="imgEditField">
                    <img
                      key={index}
                      src={img}
                      alt={`Product ${productEdit.productName} Image ${
                        index + 1
                      }`}
                    />
                    <div className="editOverlay">
                      <label htmlFor={`fileInput${index}`}>Chỉnh sửa ảnh</label>
                      <input
                        type="file"
                        id={`fileInput${index}`}
                        onChange={(e) => handleImageChange(index, e)}
                        accept="image/*"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="right-content">
            <div className="fieldInput">
              <div className="pInsert">
                <p>- Tên sản phẩm: </p>
              </div>
              <input
                className="input-danhmuc"
                type="text"
                placeholder="Nhập tên sản phẩm"
                value={productEdit.productName}
                onChange={(e) =>
                  setProductEdit({
                    ...productEdit,
                    productName: e.target.value,
                  })
                }
              />
            </div>
            <div className="fieldInput">
              <div className="pInsert">
                <p>- Giá sản phẩm: </p>
              </div>
              <input
                className="input-danhmuc"
                type="number"
                placeholder="Nhập giá sản phẩm"
                value={productEdit.price}
                onChange={(e) =>
                  setProductEdit({
                    ...productEdit,
                    price: e.target.value,
                  })
                }
              />
            </div>
            <div className="fieldInput">
              <div className="pInsert">
                <p>- Số lượng sản phẩm</p>
              </div>
              {quantity.map((sizeItem) => (
                <div key={sizeItem.size} className="quantityField">
                  <p className="sizeField">{sizeItem.size}</p>
                  <input
                    className="input-quantity"
                    type="number"
                    placeholder="Nhập số lượng"
                    value={
                      productEdit.quantity.find(
                        (item) => item.size === sizeItem.size
                      )?.numberOfSize || 0
                    }
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
            value={productEdit.description}
            onEditorChange={(content) => {
              setProductEdit({ ...productEdit, description: content });
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
        <div className="btnEditField">
          <button onClick={handleSaveEdit} className="btnEdit">
            {isSaving ? "Đang Lưu......." : "Lưu Thay Đổi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
