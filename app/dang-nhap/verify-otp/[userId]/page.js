import { getAllUsers } from "@/services/Redux/fetchData/useFetchData";
import VerifyOTP from "../../VerifyOTP";

export async function generateStaticParams() {
  const userIds = await getAllUsers();
  return userIds.map((user) => ({
    userId: user._id,
  }));
}

export default function ResetPassPage({ params }) {
  const { userId } = params;

  return <VerifyOTP userId={userId} />;
}
