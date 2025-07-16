import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: "neoSlate",
  description: "neoSlate is a lightweight, simple, and modern content management system designed for developers and content creators alike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
