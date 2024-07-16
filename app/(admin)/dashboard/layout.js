import NavbarAdmin from "@/component/NavbarAdmin/Navbar";
import "./AdminScreen.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admincontainer">
      <NavbarAdmin />
      <main className="main">{children}</main>
    </div>
  );
}
