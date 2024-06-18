// components/dashboard/Dashboard.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SideBarComponent from './SideBarComponent';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* <Navbar /> */}
      <div className="dashboard-container">
        <SideBarComponent/>
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
