import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Email Sender",
  description: "It is an email sending application developed using nextjs, typescript and nodemailer.",
  icons: {
    icon: ["/favicon.ico?v=4"],
  },
  keywords: ["email sender", "nextjs email", "nodemailer", "send email in nextjs"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}><main>{children}</main><Toaster /></body>
    </html>
  );
}
