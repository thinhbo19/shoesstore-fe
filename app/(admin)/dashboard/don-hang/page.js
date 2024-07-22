import { getAllOrder } from "@/services/Redux/api";
import HoaDon from "./HoaDon";

export default async function OrderAdminPage() {
  const orderArrAll = await getAllOrder();
  return <HoaDon orderArrAll={orderArrAll} />;
}
