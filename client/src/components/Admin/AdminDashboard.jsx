import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';


const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <AdminSidebar/>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
