import { getCategory } from "@/services/Redux/fetchData/useFetchData";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  const { categoryName } = params;
  const data = await getCategory();

  function removeVietnameseTones(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }
  let matchedCategoryName = categoryName;

  data.forEach((item) => {
    const normalizedItemName = removeVietnameseTones(
      item.categoryName.toLowerCase()
    );
    if (categoryName === normalizedItemName) {
      matchedCategoryName = item.categoryName.toLowerCase();
    }
  });

  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";
  return {
    title: `Danh mục ${matchedCategoryName} - Shoes Store`,
    description:
      "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.",
    alternates: {
      canonical: "./",
    },
    metadataBase:
      "https://shoesstore-thinhbo19s-projects.vercel.app/danh-muc-san-pham/",
    openGraph: {
      title: `Danh mục ${matchedCategoryName} - Shoes Store`,
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

export default function CategoryLayout({ children }) {
  return <>{children}</>;
}
