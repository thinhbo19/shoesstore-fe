import { getAllProducts } from "@/services/Redux/api";

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

  const baseUrl = "https://shoesstore-thinhbo19s-projects.vercel.app";

  return {
    title: `${matchedName} - Shoes Store`,
    description: `${descriptionProduct}`,
    alternates: {
      canonical: `${baseUrl}/san-pham/${matchedName}`,
    },
    metadataBase: baseUrl,
    openGraph: {
      title: `${matchedName} - Shoes Store`,
      description: descriptionProduct,
      url: `${baseUrl}/san-pham/${matchedName}`,
      siteName: "Cửa hàng bán giày",
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
