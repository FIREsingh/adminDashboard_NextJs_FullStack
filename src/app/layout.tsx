import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SideNavbar from "@/components/SideNavbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard (Manish)",
  description: "create by Manish",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen w-full bg-white text-black flex",
          inter.className
        )}
      >
        {/* sidebar */}
        <div className=" ">
          <SideNavbar />
        </div>

        {/* mainbar */}
        <div className=" p-10 w-screen">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
