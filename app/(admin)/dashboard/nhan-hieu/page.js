import { getBrand } from "@/services/Redux/fetchData/useFetchData";
import Brands from "./Brands";

const BrandPage = async () => {
  const brandData = await getBrand();
  return <Brands brandData={brandData} />;
};

export default BrandPage;
