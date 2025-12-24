import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hamro Service",
  description: "Full Stack Authentication App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

