import { getBrand } from "@/services/Redux/fetchData/useFetchData";
import SanPham from "./SanPham";
import { getAllProducts } from "@/services/Redux/api";

export default async function ProductPage() {
  const brands = await getBrand();
  const products = await getAllProducts();

  return (
    <>
      <SanPham brands={brands} products={products} />
    </>
  );
}
