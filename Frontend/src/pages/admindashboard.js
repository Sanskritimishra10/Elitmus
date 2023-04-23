import DataAnalysis from '@/components/Dashboard/DataAnalysis';
import UserAnalytics from '@/components/Dashboard/UserAnalytics';
import React from 'react';

function AdminDashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <UserAnalytics/>
      <DataAnalysis/>
      {/* <UserDashboard /> */}
    </div>
  );
}

export default AdminDashboard;
