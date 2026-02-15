'use client';

import AdminJobVerification from '@/pages/admin/AdminJobVerification';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <AdminJobVerification />
    </ProtectedRoute>
  );
}
