import { getCategory } from "@/services/Redux/fetchData/useFetchData";

export async function generateMetadata({ params, searchParams }) {
  const { categoryName } = params;
  const data = await getCategory();

  function removeVietnameseTones(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/\s+/g, "-")
      .replace(/\//g, "-")
      .toLowerCase();
  }

  let matchedCategoryName = categoryName;
  let description =
    "Chào mừng đến với cửa hàng bán giày chính hãng. Chúng tôi cung cấp giày chất lượng cao với giá tốt nhất.";

  data.forEach((item) => {
    const normalizedItemName = removeVietnameseTones(
      item.categoryName.toLowerCase()
    );
    if (categoryName === normalizedItemName) {
      matchedCategoryName = item.categoryName;
    }
  });

  const baseUrl = "https://shoesstore-thinhbo19s-projects.vercel.app";

  return {
    title: `Danh mục ${matchedCategoryName} - Shoes Store`,
    description,
    alternates: {
      canonical: `${baseUrl}/danh-muc-san-pham/${removeVietnameseTones(
        matchedCategoryName
      )}`,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `Danh mục ${matchedCategoryName} - Shoes Store`,
      description,
      url: `${baseUrl}/danh-muc-san-pham/${removeVietnameseTones(
        matchedCategoryName
      )}`,
      siteName: "Cửa hàng bán giày",
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
