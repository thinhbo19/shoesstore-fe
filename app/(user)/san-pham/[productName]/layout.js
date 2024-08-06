import { getAllProducts } from "@/services/Redux/api";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  const { productName } = params;

  const data = await getAllProducts();

  function removeVietnameseTones(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-")
      .toLowerCase();
  }
  let matchedName = productName;

  data.forEach((item) => {
    const normalizedItemName = removeVietnameseTones(
      item.productName.toLowerCase()
    );
    if (productName === normalizedItemName) {
      matchedName = item.productName;
    }
  });

  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";
  return {
    title: `${matchedName} - Shoes Store`,
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: "./",
    },
    metadataBase:
      "https://shoesstore-thinhbo19s-projects.vercel.app/danh-muc-san-pham/",
    openGraph: {
      title: `${matchedName} - Shoes Store`,
      description:
        "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
      url: header_url,
      siteName: domain,
      images: [
        {
          url: "https://res.cloudinary.com/dq1bmcdyc/image/upload/v1722946177/imageLogin_ktbiup.png",
        },
      ],
    },
  };
}

export default function DetailProductsLayout({ children }) {
  return <>{children}</>;
}
