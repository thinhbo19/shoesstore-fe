import ReduxProvider from "@/component/providers/Redux";
import "./globals.css";
import Script from "next/script";

export async function generateMetadata({ params, searchParams }) {
  const baseUrl = "https://shoesstore-thinhbo19s-projects.vercel.app";

  return {
    title: "Trang Chủ - Shoes Store",
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: baseUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: "Trang Chủ - Shoes Store",
      description:
        "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
      url: baseUrl,
      siteName: "Shoes Store",
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
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-798VRR2CBS"
        ></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-798VRR2CBS');
          `}
        </Script>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
