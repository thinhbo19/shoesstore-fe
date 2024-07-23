import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";

const BreadcrumbForProdDetail = ({ productName }) => {
  console.log(productName);

  return (
    <div
      style={{ backgroundColor: "#f0f0f0", height: "100%" }}
      role="presentation"
    >
      <Breadcrumbs
        separator="›"
        sx={{ fontSize: "1rem", padding: "0.5rem" }}
        aria-label="pathName"
      >
        <Link
          href="/"
          className="pathName"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Trang Chủ
        </Link>
        <Link
          href="/san-pham"
          className="pathName"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          Sản Phẩm
        </Link>
        <Link
          href="/san-pham"
          className="pathName"
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          {productName}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbForProdDetail;
