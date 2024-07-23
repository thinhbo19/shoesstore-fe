import ChatBox from "@/component/ChatBox/ChatBox";
import Footer from "@/component/HeaderFooter/Footers";
import Header from "@/component/HeaderFooter/Headers";
import { getAllProducts } from "@/services/Redux/api";

export default async function UserLayout({ children }) {
  const allProducts = await getAllProducts();

  return (
    <>
      <Header allProducts={allProducts} />
      {children}
      {/* <ChatBox /> */}
      <Footer />
    </>
  );
}
