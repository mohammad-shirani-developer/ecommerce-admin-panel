interface ProductsToolbarProps {
  onSearchChange: (value: string) => void;
  setIsCreateModalOpen: (isOpen: boolean) => void;
}
const ProductsToolbar = ({
  onSearchChange,
  setIsCreateModalOpen,
}: ProductsToolbarProps) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          placeholder="جستجوی کاربر..."
          className="
            w-full
            rounded-md
            border
            border-gray-700
            bg-gray-900
            px-3
            py-2
            text-sm
            text-gray-200
            placeholder-gray-400
            outline-none
            focus:border-blue-500
            focus:ring-1
            focus:ring-blue-500
          "
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <button
        onClick={() => setIsCreateModalOpen(true)}
        className="px-4 py-2 bg-green-600 rounded cursor-pointer hover:bg-green-500 text-white"
      >
        + افزودن محصول
      </button>
    </div>
  );
};

export default ProductsToolbar;
