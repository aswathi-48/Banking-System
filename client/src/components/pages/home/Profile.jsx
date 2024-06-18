import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div >
      {userData ? (
        <div>
          <h2>User Profile</h2>
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Name:</strong> {userData.first_name}  {userData.last_name }</p>
          <p style={{color:"black"}}><strong style={{color:"gray"}}>Email:</strong> {userData.email}</p>
          {/* Add other user details as needed */}
        </div>
      ) : (
        <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default Profile;
