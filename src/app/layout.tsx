import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" className="dark">
      <body className=" bg-gray-900 text-gray-100">{children}</body>
    </html>
  );
}
