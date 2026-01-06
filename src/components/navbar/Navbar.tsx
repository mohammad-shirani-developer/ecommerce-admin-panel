import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

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
