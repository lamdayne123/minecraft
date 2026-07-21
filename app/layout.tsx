import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://craftopics.vercel.app"),

  title: "Craftopia Survival",
  description:
    "Máy chủ Minecraft Survival chất lượng cao. Tham gia ngay cùng cộng đồng Craftopia!",

  openGraph: {
    title: "Craftopia Survival",
    description:
      "Khám phá thế giới Survival đầy hấp dẫn tại Craftopia.",
    url: "https://craftopics.vercel.app",
    siteName: "Craftopia Survival",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Craftopia Survival",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Craftopia Survival",
    description:
      "Máy chủ Minecraft Survival chất lượng cao.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};
