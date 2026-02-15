'use client';

import CreateCleanTipPage from '@/pages/CreateCleanTipPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute>
      <CreateCleanTipPage />
    </ProtectedRoute>
  );
}
