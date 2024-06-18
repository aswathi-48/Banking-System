import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaHistory, FaCreditCard } from 'react-icons/fa';
import './SideBarComponent.css'; 

const SideBarComponent = () => {
  return (
    <div className="sidebar">
      <ul>
      <li>
           <img src="" alt="" />
          
        </li>
        <li>
          <Link to="dashboardContent">
            <FaTachometerAlt className="sidebar-icon" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="profile">
            <FaUser className="sidebar-icon" />
            <span>Profile</span>
          </Link>
        </li>
        <li>
          <Link to="transaction-history">
            <FaHistory className="sidebar-icon" />
            <span>Transaction History</span>
          </Link>
        </li>
        <li>
          <Link to="account-details">
            <FaCreditCard className="sidebar-icon" />
            <span>Account Details</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBarComponent;
