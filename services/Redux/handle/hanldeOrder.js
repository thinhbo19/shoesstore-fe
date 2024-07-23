import { apiUrlOrder } from "@/services/config";
import axios from "axios";

export const postOrder = async (
  accessToken,
  products,
  coupon,
  Note,
  address
) => {
  try {
    const res = await axios.post(
      `${apiUrlOrder}/copy`,
      {
        products: products.map((selectedProduct) => ({
          product: selectedProduct.product,
          size: selectedProduct.size,
          count: selectedProduct.count,
          price: selectedProduct.price,
          img: selectedProduct.img,
          name: selectedProduct.name,
        })),
        coupon: coupon,
        Note: Note,
        address: address,
        status: "Processing",
      },
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};
