'use client';

import AdminCleanTips from '@/pages/admin/AdminCleanTips';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <AdminCleanTips />
    </ProtectedRoute>
  );
}
