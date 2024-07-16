import { getCategory } from "@/services/Redux/fetchData/useFetchData";
import Categories from "./Categories";

const CategoriesPage = async () => {
  const cateData = await getCategory();
  return <Categories cateData={cateData} />;
};

export default CategoriesPage;
