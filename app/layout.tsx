import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GTM AI Agent - Go-To-Market Intelligence Platform",
  description: "AI-powered Go-To-Market strategy and execution platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
