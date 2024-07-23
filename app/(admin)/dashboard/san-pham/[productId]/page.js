import { getAllProducts } from "@/services/Redux/api";
import EditForm from "./EditForm";

export async function generateStaticParams() {
  const productIds = await getAllProducts();
  return productIds.map((prod) => ({
    productId: prod._id,
  }));
}

export default async function EditProductPage({ params }) {
  const { productId } = params;

  return <EditForm productId={productId} />;
}
