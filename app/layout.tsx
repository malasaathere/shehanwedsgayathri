import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shehan & Gayathri — Wedding Invitation",
  description: "Join Shehan and Gayathri as they celebrate their wedding on September 7, 2026.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
