export async function generateMetadata({ params, searchParams }) {
  const baseUrl = "https://shoesstore-ten.vercel.app";

  return {
    title: "Đăng nhập - Shoes Store",
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: baseUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: "Đăng nhập - Shoes Store",
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

export default function LoginSignupLayout({ children }) {
  return <>{children}</>;
}
