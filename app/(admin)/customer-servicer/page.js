import Staff from "@/component/Staff/Staff";
import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";

export default async function StaffPage() {
  const allUser = await getAllUsers();

  return <Staff allUser={allUser} />;
}
