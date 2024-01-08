import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboardUI = ({ views }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">User Dashboard</h2>
      <br></br>
      <br></br>
      <br></br>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3 text-center">
          <Link to="/calculator" className={`btn btn-primary btn-lg btn-block black_button ${views['SQFeetCalc'] ? 'active' : ''}`}>
            SQ Feet Calculator
          </Link>
        </div>
        <div className="col-md-3 mb-3 text-center">
          <Link to="/system" className={`btn btn-primary btn-lg btn-block black_button ${views['InventorySystem'] ? 'active' : ''}`}>
            Inventory System
          </Link>
        </div>
      </div>
      <br></br>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3 text-center">
          <Link to="/reprint" className={`btn btn-primary btn-lg btn-block black_button ${views['UserManagement'] ? 'active' : ''}`}>
            RePrint
          </Link>
        </div>
        {views['Dashboard'] && (
        <div className="col-md-3 mb-3 text-center">
          <Link to="/dashboard" className={`btn btn-primary btn-lg btn-block black_button ${views['Dashboard'] ? 'active' : ''}`}>
            Dashboard
          </Link>
        </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboardUI;