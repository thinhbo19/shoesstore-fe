import { getBrand, getCategory } from "@/services/Redux/fetchData/useFetchData";
import EditForm from "./EditForm";

export default async function EditProductPage() {
  const brand = await getBrand();
  const Category = await getCategory();
  return <EditForm brand={brand} Category={Category} />;
}
