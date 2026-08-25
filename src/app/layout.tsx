import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Élan — Digital wedding invitations, thoughtfully made",
  description:
    "Create a beautiful, personal digital wedding invitation — designed for your traditions, effortless to share.",
  openGraph: {
    title: "There is a little surprise for you",
    description: "Open this beautiful digital invitation.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
