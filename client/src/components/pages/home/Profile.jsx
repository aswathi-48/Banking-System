import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = (params) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedToken = localStorage.getItem("access_token")


        const response = await axios.post('http://localhost:7100/user/profile',{userId: params.id}, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });

        setUserData(response.data.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  return (
    <div className="profile-container">
      {userData ? (
        <div className="profile-card">
          <h2>User Profile</h2>
          <img src={userData.image} alt="" style={{ width: '50px', height: 'auto', borderRadius: "50px" }} />
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Name:</strong> {userData.first_name}  {userData.last_name }</p>
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Email:</strong> {userData.email}</p>
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Gender:</strong> {userData.gender} </p>
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Date of Birth:</strong> {formatDate(userData.date_of_birth)}</p>
          {/* <button>Edit</button> */}
        </div>
      ) : (
        <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
};  

export default Profile;
