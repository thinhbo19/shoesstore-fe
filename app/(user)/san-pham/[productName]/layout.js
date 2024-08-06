import { getOneProductByName } from "@/services/Redux/handle/hanldeProduct";

export async function generateMetadata({ params, searchParams }) {
  const { productName } = params;
  const productData = await getOneProductByName(productName);

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

  const baseUrl = "https://shoesstore-thinhbo19s-projects.vercel.app";
  const productUrl = `${baseUrl}/san-pham/${removeVietnameseTones(
    productData?.productName
  )}`;

  return {
    title: `${productData?.productName} - Shoes Store`,
    description: `${productData?.description}`,
    alternates: {
      canonical: productUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${productData?.productName} - Shoes Store`,
      description: productData?.description,
      url: productUrl,
      siteName: "Cửa hàng bán giày",
      images: [
        {
          url: productData?.images[0],
        },
      ],
    },
  };
}

export default function DetailProductsLayout({ children }) {
  return <>{children}</>;
}
