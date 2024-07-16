import { getBrand, getCategory } from "@/services/Redux/fetchData/useFetchData";
import AddForm from "./AddForm";

const AddProductPage = async () => {
  const brand = await getBrand();
  const Category = await getCategory();
  return <AddForm brand={brand} Category={Category} />;
};

export default AddProductPage;
