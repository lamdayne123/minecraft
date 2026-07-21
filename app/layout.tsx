import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://craftopics.vercel.app"),

  title: {
    default: "Craftopia Survival",
    template: "%s | Craftopia Survival",
  },

  description:
    "Máy chủ Minecraft Survival Chill. Java & Bedrock. Tham gia ngay để khám phá thế giới Craftopia!",

  keywords: [
    "Craftopia",
    "Craftopia Survival",
    "Minecraft",
    "Minecraft Server",
    "Minecraft Việt Nam",
    "Java",
    "Bedrock",
  ],

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Craftopia Survival",
    description:
      "Máy chủ Minecraft Survival Chill. Java & Bedrock.",
    url: "https://craftopics.vercel.app",
    siteName: "Craftopia Survival",
    locale: "vi_VN",
    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: "Craftopia Survival",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Craftopia Survival",
    description:
      "Máy chủ Minecraft Survival Chill.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
