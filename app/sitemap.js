import { getAllProducts } from "@/services/Redux/api";
import { getCategory } from "@/services/Redux/fetchData/useFetchData";

export default async function sitemap() {
  const vercelUrl = process.env.VERCEL_URL;

  const categories = await getCategory();
  const products = await getAllProducts();

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

  const categoryUrls = categories.map((category) => ({
    url: `${vercelUrl}/san-pham/danh-muc-san-pham/${category.categoryName}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const productUrls = products.map((product) => ({
    url: `${vercelUrl}/san-pham/${removeVietnameseTones(product.productName)}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: `${vercelUrl}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${vercelUrl}/san-pham`,
      lastModified: new Date(),
      priority: 1,
    },
  ];

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
