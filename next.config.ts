import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* AVIF d'abord (≈ 30 % plus léger), WebP en repli : les photos métier en
       couleur sont les images les plus lourdes du site. */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
