import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import OwnerDashboard from './OwnerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      {user.role === 'employee' ? <EmployeeDashboard /> : <OwnerDashboard />}
    </div>
  );
};

export default Dashboard;