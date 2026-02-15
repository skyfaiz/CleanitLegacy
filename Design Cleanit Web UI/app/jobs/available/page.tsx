'use client';

import AvailableJobsPage from '@/pages/AvailableJobsPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute>
      <AvailableJobsPage />
    </ProtectedRoute>
  );
}
