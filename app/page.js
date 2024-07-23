import HomePage from "./Home";
import Header from "../component/HeaderFooter/Headers";
import Footer from "@/component/HeaderFooter/Footers";
import { getAllProducts } from "@/services/Redux/api";

export default async function Home() {
  const allProducts = await getAllProducts();

  return (
    <>
      <Header allProducts={allProducts} />
      <HomePage />;
      <Footer />
    </>
  );
}
