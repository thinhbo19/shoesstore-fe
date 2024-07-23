import { getCategory } from "@/services/Redux/fetchData/useFetchData";
import SanPhamDanhMuc from "./SanPhamDanhMuc";

export async function generateStaticParams() {
  const Data = await getCategory();
  return Data.map((cate) => ({
    categoryName: cate.categoryName,
  }));
}

export default function CategoryPage({ params }) {
  const { categoryName } = params;

  return <SanPhamDanhMuc categoryName={categoryName} />;
}
