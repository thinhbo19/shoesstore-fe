import { getBrand, getCategory } from "@/services/Redux/fetchData/useFetchData";
import SanPhamDanhMuc from "./SanPhamDanhMuc";

export async function generateStaticParams() {
  const Data = await getCategory();
  return Data.map((cate) => ({
    categoryName: cate.categoryName,
  }));
}

export default async function CategoryPage({ params }) {
  const brands = await getBrand();

  const { categoryName } = params;

  return <SanPhamDanhMuc brands={brands} categoryName={categoryName} />;
}
