import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";
  return {
    title: "Sản phẩm - Shoes Store",
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: "./",
    },
    metadataBase: "https://shoesstore-thinhbo19s-projects.vercel.app/san-pham",
    openGraph: {
      title: "Sản phẩm - Shoes Store",
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

export default function ProductsLayout({ children }) {
  return <>{children}</>;
}
