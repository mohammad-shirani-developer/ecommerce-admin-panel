interface UsersToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  setIsCreateModalOpen: (open: boolean) => void; // ✅ اضافه شود
}

const UsersToolbar = ({
  searchValue,
  onSearchChange,
  setIsCreateModalOpen,
}: UsersToolbarProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="جستجوی کاربر..."
        className="w-full max-w-sm rounded border px-3 py-2"
      />

      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        + افزودن کاربر
      </button>
    </div>
  );
};

export default UsersToolbar;
