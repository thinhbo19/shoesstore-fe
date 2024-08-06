import ReduxProvider from "@/component/providers/Redux";
import "./globals.css";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";
  return {
    title: "Trang Chủ - Cửa hàng bán giày",
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: "./",
    },
    metadataBase: "https://shoesstore-thinhbo19s-projects.vercel.app",
    openGraph: {
      title: "Trang Chủ - Cửa hàng bán giày",
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
