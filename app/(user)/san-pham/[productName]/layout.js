import { getOneProductByName } from "@/services/Redux/handle/hanldeProduct";

function stripHtmlTags(html) {
  return html.replace(/<\/?[^>]+>/gi, "");
}

export async function generateMetadata({ params, searchParams }) {
  const { productName } = params;
  const productData = await getOneProductByName(productName);

  const baseUrl = "https://shoesstore-ten.vercel.app";
  const productUrl = `${baseUrl}/san-pham/${productName}`;
  const maxDescriptionLength = 200;

  const description = stripHtmlTags(productData?.description || "");
  const shortDescription =
    description.length > maxDescriptionLength
      ? description.slice(0, maxDescriptionLength) + "..."
      : description;

  return {
    title: `${productData?.productName} - Shoes Store`,
    description: shortDescription,
    alternates: {
      canonical: productUrl,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${productData?.productName} - Shoes Store`,
      description: shortDescription,
      url: productUrl,
      siteName: "Cửa hàng bán giày",
      images: [
        {
          url: productData?.images[0],
          alt: productData?.productName,
        },
      ],
    },
  };
}

export default function DetailProductsLayout({ children }) {
  return <>{children}</>;
}
