import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF Magic - Free PDF Tools",
  description: "Merge, split, compress, and convert PDF files online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9004642063111900" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9004642063111900"
             crossOrigin="anonymous"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
