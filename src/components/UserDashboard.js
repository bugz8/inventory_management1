import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminDashboard from '../views/AdminDashboard';
import UserDashboardUI from '../views/UserDashboardUI';

const UserDashboard = ({ userRole, userId }) => {
  const [adminViews, setAdminViews] = useState({
    'SQFeetCalc': true,
    'InventorySystem': true,
    'UserManagement': true,
    'Dashboard': false,
  });

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(`/api/user/settings/${userId}`);
        const userSettings = response.data;
        setAdminViews(userSettings);
      } catch (error) {
        console.error('Error fetching user settings:', error);
      }
    };

    fetchUserSettings();
  }, [userId]);

  const toggleViewVisibility = async (viewName) => {
    setAdminViews((prevViews) => ({
      ...prevViews,
      [viewName]: !prevViews[viewName],
    }));

    try {
      await axios.post('/api/user/settings', {
        userId: userId,
        [viewName]: !adminViews[viewName],
      });
    } catch (error) {
      console.error('Error updating user settings:', error);
    }
  };

  const renderDashboard = () => {
    if (userRole === 'admin') {
      return <AdminDashboard views={adminViews} toggleViewVisibility={toggleViewVisibility} />;
    } else {
      return <UserDashboardUI views={adminViews} />;
    }
  };

  return (
    <div>
      {renderDashboard()}
    </div>
  );
};

export default UserDashboard;