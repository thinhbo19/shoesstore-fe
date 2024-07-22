import { getAllVoucher } from "@/services/Redux/fetchData/useFetchData";
import Voucher from "./Voucher";

const VoucherPage = async () => {
  const voucherData = await getAllVoucher();
  return <Voucher voucherData={voucherData} />;
};
export default VoucherPage;
