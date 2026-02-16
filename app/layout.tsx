import type { Metadata } from "next";
import {
  Corinthia,
  Inter,
  Montserrat,
  Petit_Formal_Script,
} from "next/font/google";
import "./globals.css";

const corinthia = Corinthia({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-corinthia",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
});

const petitFormalScript = Petit_Formal_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-petit-formal-script",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Phương Trang & Trọng Nhân - Wedding Invitation",
  description: "Gửi đến bạn tấm thiệp cưới đầy yêu thương",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} ${corinthia.variable} ${montserrat.variable} ${petitFormalScript.variable} bg-[#f9f8f6] text-[#333]`}
      >
        {children}
      </body>
    </html>
  );
}
