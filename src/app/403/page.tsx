const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold text-red-500 mb-4">403</h1>
      <p className="text-gray-400">شما اجازه دسترسی به این صفحه را ندارید</p>
    </div>
  );
};

export default ForbiddenPage;
