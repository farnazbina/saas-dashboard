import type { Metadata } from "next";
import { Google_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
// import { ModalProvider } from "@/components/modals/modalProvider";
import QueryProviders from "@/providers/react-query";


const googleSans = Google_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-google-sans',
  adjustFontFallback: false,
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
      suppressHydrationWarning
      className={`${googleSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            scriptProps={{
              "data-cfasync": "false", // افزودن این خط برای رفع هشدار
            }}
          >
            {children}
            {/* <ModalProvider /> */}
          </ThemeProvider>
        </QueryProviders>
      </body>
    </html>
  );
}
