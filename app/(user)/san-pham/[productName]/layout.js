import { getOneProductByName } from "@/services/Redux/handle/hanldeProduct";

export async function generateMetadata({ params, searchParams }) {
  const { productName } = params;
  const productData = await getOneProductByName(productName);

  const baseUrl = "https://shoesstore-thinhbo19s-projects.vercel.app";
  const productUrl = `${baseUrl}/san-pham/${productName}`;

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
