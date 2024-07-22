import UsersList from "./Users";
import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";

export default async function UserAdmin() {
  const userList = await getAllUsers();
  return <UsersList users={userList} />;
}
