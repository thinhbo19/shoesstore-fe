import { getAllOrder } from "@/services/Redux/api";
import OrderDetail from "./OrderDetail";

export async function generateStaticParams() {
  const Ids = await getAllOrder();
  return Ids.map((or) => ({
    orderId: or._id,
  }));
}

export default function OrderDetailPage({params}) {
  const { orderId } = params;
  return <OrderDetail orderId={orderId} />;
}
