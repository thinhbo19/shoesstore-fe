export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/user/*",
        "/admin/*",
        "/customer-servicer/*",
        "/thanh-toan/*",
        "/thanh-toan-ngay/*",
        "/san-pham/danh-muc-san-pham/*",
      ],
    },
    sitemap: "https://shoesstore-thinhbo19s-projects.vercel.app/sitemap.xml",
  };
}
