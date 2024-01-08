import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetching data from the server for admin dashboard
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        const data = response.data;
        console.log('Admin Dashboard Data:', data);
        // Set the fetched data to state
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Admin Dashboard</h2>
      <br></br>
      <br></br>
      <br></br>
      {dashboardData && (
        <div>
          {/* Rendering dashboard data here */}
          <p>Total Users: {dashboardData.totalUsers}</p>
          <p>Total Inventory Items: {dashboardData.totalInventoryItems}</p>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3 text-center">
          <Link to="/calculator" className="btn btn-primary btn-lg btn-block black_button">
            SQ Feet Calculator
          </Link>
        </div>
        <div className="col-md-3 mb-3 text-center">
          <Link to="/system" className="btn btn-primary btn-lg btn-block black_button">
            Inventory System
          </Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3 text-center">
          <Link to="/management" className="btn btn-primary btn-lg btn-block black_button">
            Manage Users
          </Link>
        </div>
        <div className="col-md-3 mb-3 text-center">
          <Link to="/dashboard" className="btn btn-primary btn-lg btn-block black_button">
            Dashboard
          </Link>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-3 mb-3 text-center">
            <Link to="/data" className="btn btn-primary btn-lg btn-block black_button">
              Basic Data
            </Link>
          </div>
          <div className="col-md-3 mb-3 text-center">
            <Link to="/reprint" className="btn btn-primary btn-lg btn-block black_button">
              RePrint
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;