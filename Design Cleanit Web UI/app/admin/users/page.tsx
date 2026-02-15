'use client';

import AdminUsers from '@/pages/admin/AdminUsers';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <AdminUsers />
    </ProtectedRoute>
  );
}
