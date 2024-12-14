import "./globals.css";
import { Metadata } from "next";
import { ReactNode } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s - Chat App",
      default: `Home - Chat App`,
    },
    description: "Chat App HomePage",
    icons: {
      icon: [
        {
          url: "/icons/favicon-32x32.png",
          type: "image/png",
          sizes: "32x32",
        },
        {
          url: "/icons/android-chrome-192x192.png",
          type: "image/png",
          sizes: "192x192",
        },
        {
          url: "/icons/android-chrome-512x512.png",
          type: "image/png",
          sizes: "512x512",
        },
      ],
      apple: "/icons/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
