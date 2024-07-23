import { getAllProducts } from "@/services/Redux/api";
import ChiTietSanPham from "./chitietsanpham";

export async function generateStaticParams() {
  const productData = await getAllProducts();
  return productData.map((prod) => ({
    productName: prod.productName,
  }));
}

export default function ProductDetailPage({ params }) {
  const { productName } = params;

  return <ChiTietSanPham productName={productName} />;
}
