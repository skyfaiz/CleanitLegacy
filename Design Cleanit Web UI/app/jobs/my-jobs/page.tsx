'use client';

import MyJobsPage from '@/pages/MyJobsPage';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute>
      <MyJobsPage />
    </ProtectedRoute>
  );
}
