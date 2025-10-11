import "../styles/globals.css";
import type { Metadata } from "next";
import Providers from "@/store/Providers";

export const metadata: Metadata = {
  title: "Linkify",
  description: "Linkify app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f1f1ee] min-h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
