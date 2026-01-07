import { useLogout } from "@/hooks/useLogout";
import { useAuthStore } from "@/stores/auth.store";

const Navbar = () => {
  const user = useAuthStore((state) => state.user);

  const handleLogout = useLogout();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <span className="text-sm">سلام {user?.name}</span>

      <button
        onClick={handleLogout}
        className="text-red-400 hover:text-red-300"
      >
        خروج
      </button>
    </nav>
  );
};

export default Navbar;
