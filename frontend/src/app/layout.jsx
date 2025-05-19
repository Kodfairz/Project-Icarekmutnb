import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import './font.css'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ICare@KMUTNB",
  icons: {
    icon: '/pharmacy.png',
  },
};

import { ToastContainer, toast } from 'react-toastify';
import { url } from "inspector";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
