'use client';

import AdminCampaigns from '@/pages/admin/AdminCampaigns';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Page() {
  return (
    <ProtectedRoute adminOnly>
      <AdminCampaigns />
    </ProtectedRoute>
  );
}
