import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoSansSC = localFont({
  src: "../public/NotoSansSC-VariableFont_wght.ttf",
  variable: "--font-noto-sans-sc",
});

const notoSerifSC = localFont({
  src: "../public/NotoSerifSC-VariableFont_wght.ttf",
  variable: "--font-noto-serif-sc",
});

export const metadata: Metadata = {
  title: "Chat with AI",
  description: "Chat with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansSC.variable} ${notoSerifSC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
