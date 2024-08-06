import { getAllProducts } from "@/services/Redux/api";
import { headers } from "next/headers";

export async function generateMetadata({ params, searchParams }, parent) {
  const { productName } = params;
  const data = await getAllProducts();

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
  let matchedName = productName;
  let descriptionProduct;
  let imageProduct;

  data.forEach((item) => {
    const normalizedItemName = removeVietnameseTones(
      item.productName.toLowerCase()
    );
    if (productName === normalizedItemName) {
      matchedName = item.productName;
      descriptionProduct = item.description;
      imageProduct = item.images[0];
    }
  });
  const headersList = headers();
  const header_url = headersList.get("x-url") || "";
  const domain = headersList.get("host") || "";
  return {
    title: `${matchedName} - Shoes Store`,
    description: `${descriptionProduct}`,
    alternates: {
      canonical: "./",
    },
    metadataBase: `https://shoesstore-thinhbo19s-projects.vercel.app/san-pham/${productName}`,
    openGraph: {
      title: `${matchedName} - Shoes Store`,
      description: descriptionProduct,
      url: header_url,
      siteName: domain,
      images: [
        {
          url: imageProduct,
        },
      ],
    },
  };
}

export default function DetailProductsLayout({ children }) {
  return <>{children}</>;
}
