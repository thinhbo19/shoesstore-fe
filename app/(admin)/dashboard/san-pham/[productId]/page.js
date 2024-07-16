import { getBrand, getCategory } from "@/services/Redux/fetchData/useFetchData";
import EditForm from "./EditForm";

const EditProductPage = async () => {
  const brand = await getBrand();
  const Category = await getCategory();
  return <EditForm brand={brand} Category={Category} />;
};

export default EditProductPage;
