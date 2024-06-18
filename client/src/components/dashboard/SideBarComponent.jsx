import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaHistory, FaCreditCard } from 'react-icons/fa';
import './SideBarComponent.css'; 
import { LuLogOut } from "react-icons/lu";

const SideBarComponent = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login'); 
  };

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
        <li>
          {/* <LuLogOut className="sidebar-icon" /> */}
          <a className="logout-button" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBarComponent;
