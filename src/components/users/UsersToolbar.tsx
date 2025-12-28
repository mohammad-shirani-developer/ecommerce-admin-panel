const UsersToolbar = () => {
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
        />
      </div>
    </div>
  );
};

export default UsersToolbar;
