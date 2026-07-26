import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";


const googleSans = Google_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-google-sans',
});

export const metadata: Metadata = {
  title: "Saas Dashboard - Farnaz Bina",
  description: "A SaaS dashboard template built with Next.js, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
