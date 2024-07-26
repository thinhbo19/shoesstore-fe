/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "d13xymm0hzzbsd.cloudfront.net",
      "misskick.vn",
      "file.hstatic.net",
      "uproxx.com",
      "hstatic.net",
      "thieuhoa.com.vn",
    ],
  },
};

export default nextConfig;
