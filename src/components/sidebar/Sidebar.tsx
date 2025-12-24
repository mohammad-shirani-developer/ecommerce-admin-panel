const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 min-h-screen p-4">
      <h1 className="text-xl font-bold mb-6" lang="en">
        E-Commerce Admin
      </h1>
      <nav className="space-y-2">
        <a className="block rounded hover:bg-gray-700">داشبور</a>
        <a className="block rounded hover:bg-gray-700">کاربران</a>
        <a className="block rounded hover:bg-gray-700">محصولات</a>
      </nav>
    </aside>
  );
};

export default Sidebar;
