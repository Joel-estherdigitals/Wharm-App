import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://whamr.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Whamr — Send the wham",
  description:
    "Find the right meme or sticker for any moment, and send it anywhere in one tap.",
  applicationName: "Whamr",
  openGraph: {
    title: "Whamr — Send the wham",
    description:
      "Find the right meme or sticker for any moment, and send it anywhere in one tap.",
    url: SITE_URL,
    siteName: "Whamr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whamr — Send the wham",
    description:
      "Find the right meme or sticker for any moment, and send it anywhere in one tap.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF4500",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
