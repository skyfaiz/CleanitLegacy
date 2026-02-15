'use client';

import AdminPayouts from '@/pages/admin/AdminPayouts';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <AdminPayouts />
    </ProtectedRoute>
  );
}
