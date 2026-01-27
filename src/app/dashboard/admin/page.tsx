"use client";

import RoleGuard from "@/components/guards/RoleGuard";

const AdminPage = () => {
  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div>
        <h1 className="text-xl font-bold">مدیریت محصولات</h1>
      </div>
    </RoleGuard>
  );
};

export default AdminPage;
