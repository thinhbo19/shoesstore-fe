import {
  getBrand,
  getCategory,
  getProduct,
} from "@/services/Redux/fetchData/useFetchData";
import Products from "./Products";

const ProductPage = async () => {
  const productData = await getProduct();
  const brandData = await getBrand();
  const cateData = await getCategory();

  const productList = productData.data.productDatas;
  return (
    <Products
      cateData={cateData}
      brandData={brandData}
      productList={productList}
    />
  );
};

export default ProductPage;
