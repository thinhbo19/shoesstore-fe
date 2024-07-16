// import ChatBox from "@/component/ChatBox/ChatBox";
import Footer from "@/component/HeaderFooter/Footers";
import Header from "@/component/HeaderFooter/Headers";

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      {/* <ChatBox /> */}
      <Footer />
    </>
  );
}
