import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6" lang="en">
        E-Commerce Admin
      </h1>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block rounded hover:bg-gray-700">
          داشبور
        </Link>
        <Link href="/users" className="block rounded hover:bg-gray-700">
          کاربران
        </Link>
        <Link href="/products" className="block rounded hover:bg-gray-700">
          محصولات
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
