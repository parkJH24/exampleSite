/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone", // Netlify에서 Next.js 최적화
    trailingSlash: true, // 정적 파일 접근 시 404 방지
  };
  
  module.exports = nextConfig;
  