import { Figtree } from "next/font/google";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

const vazirmatn = localFont({
  src: [
    {
      path: "../../public/fonts/vazirmatn/Vazirmatn-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/vazirmatn/Vazirmatn-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/vazirmatn/Vazirmatn-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/vazirmatn/Vazirmatn-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      dir="rtl"
      className={`dark ${figtree.variable} ${vazirmatn.variable}`}
    >
      <body className="bg-gray-900 text-gray-100">
        {children}

        {/* Global Toast */}
        <ToastContainer
          theme="dark"
          position="top-right"
          autoClose={3000}
          newestOnTop
          rtl
        />
      </body>
    </html>
  );
}
