import React from 'react'
import { FaTachometerAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { LuLogOut } from "react-icons/lu";

const AdminSidebar = () => {

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
        <Link to="adminContent">
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
        <Link to="clients">
        <FaUser className="sidebar-icon" />
        <span>client Users</span>
        </Link>
      </li>
      <li>
      <li>
      {/* <LuLogOut className="sidebar-icon" /> */}
          <a className="logout-button" onClick={handleLogout} >
            Logout
          </a>
        </li>
        {/* <Link to="account-details">
          <FaCreditCard className="sidebar-icon" />
          <span>Account Details</span>
        </Link> */}
      </li>
    </ul>
  </div>
  )
}

export default AdminSidebar