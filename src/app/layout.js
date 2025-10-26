import "./globals.css";

export const metadata = {
  title: "Admin Dashboard",
  description: "Ultimate platform for music streamming",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
