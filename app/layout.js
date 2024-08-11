import ReduxProvider from "@/component/providers/Redux";
import "./globals.css";
import Script from "next/script";
import ChatBox from "@/component/ChatBox/ChatBox";
import ChatBotMessenger from "@/component/ChatBotMessenger/ChatBotMessenger";

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
      <head>
        <script id="mcjs">
          !function(c,h,i,m,p)
          {
            ((m = c.createElement(h)),
            (p = c.getElementsByTagName(h)[0]),
            (m.async = 1),
            (m.src = i),
            p.parentNode.insertBefore(m, p))
          }
          (document,"script","https://chimpstatic.com/mcjs-connected/js/users/fec924f00947bba359f746e97/ce9444df0b7db8327aeb2cb75.js");
        </script>
      </head>
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
        <ReduxProvider>
          {children}
          <ChatBox />
          <ChatBotMessenger />
        </ReduxProvider>
      </body>
    </html>
  );
}
