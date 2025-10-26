import { Toaster } from "sonner";

export const metadata = {
  title: "Admin Dashboard",
  description: "Ultimate platform for music streamming",
};

export default function AdminLayout({ children }) {
  return (
    <div className="admin">
      <Toaster />
      {children}
    </div>
  );
}