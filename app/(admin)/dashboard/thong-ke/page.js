import { getAllOrder } from "@/services/Redux/api";
import ThongKe from "./ThongKe";

export default async function StatisticalAdminPage() {
  const allOrder = await getAllOrder();

  return <ThongKe allOrder={allOrder} />;
}
