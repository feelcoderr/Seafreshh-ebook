import "./globals.css";

export const metadata = {
  title: "SeaFreshh - Seafood Recipe eBook",
  description:
    "Master the Art of Seafood Cooking with our exclusive eBook featuring 30+ authentic seafood recipes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
