// src/app/layout.js
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Script from "next/script";

export const metadata = {
  title: "SeaFreshh - Seafood Recipe eBook",
  description:
    "Master the Art of Seafood Cooking with our exclusive eBook featuring 30+ authentic seafood recipes",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
