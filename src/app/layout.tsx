import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { SessionProvider, QueryProvider } from "@/components/providers";
import { ToastProvider } from "@/components/providers/toast-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaskFlow - Task Management for Modern Teams",
  description: "Manage your projects and tasks efficiently with TaskFlow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <SessionProvider>
          <QueryProvider>
            <Navbar />
            <div className="flex-1">
              <ToastProvider>{children}</ToastProvider>
            </div>
            <Footer />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
