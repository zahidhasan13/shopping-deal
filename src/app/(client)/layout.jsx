'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Header from "@/components/share/Header";
import Footer from "@/components/share/Footer";
import AuthProvider from "@/context/AuthProvider";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <AuthProvider>
          <Header />
          {children}
          <Footer />
        </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
