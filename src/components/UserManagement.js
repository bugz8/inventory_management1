import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserListItem from './UserListItem';

const UserManagement = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [normalUsers, setNormalUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminResponse = await axios.get('/api/admin_users');
        setAdminUsers(adminResponse.data);

        const normalResponse = await axios.get('/api/users');
        setNormalUsers(normalResponse.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (userId, isAdmin) => {
    try {
      const endpoint = isAdmin ? '/api/admin/approveAdminUser' : '/api/admin/approveNormalUser';
      await axios.post(endpoint, { userId });
      const updatedUsers = isAdmin
        ? adminUsers.map((user) => (user.id === userId ? { ...user, approved: true } : user))
        : normalUsers.map((user) => (user.id === userId ? { ...user, approved: true } : user));
      isAdmin ? setAdminUsers(updatedUsers) : setNormalUsers(updatedUsers);
    } catch (error) {
      console.error(`Error approving ${isAdmin ? 'admin' : 'normal'} user:`, error);
    }
  };

  const handleRemove = async (userId, isAdmin) => {
    try {
      const endpoint = isAdmin ? '/api/admin/removeUser' : '/api/admin/removeNormalUser';
      await axios.post(endpoint, { userId });
      const updatedUsers = isAdmin
        ? adminUsers.filter((user) => user.id !== userId)
        : normalUsers.filter((user) => user.id !== userId);
      isAdmin ? setAdminUsers(updatedUsers) : setNormalUsers(updatedUsers);
    } catch (error) {
      console.error(`Error removing ${isAdmin ? 'admin' : 'normal'} user:`, error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">User Management</h2>
      <div>
        <br></br>
        <br></br>
        <h3>Admin Users:</h3>
        <ul>
          {adminUsers.map((adminUser) => (
            <UserListItem
              key={adminUser.id}
              user={adminUser}
              handleApproval={handleApproval}
              handleRemove={handleRemove}
              isAdmin={true}
            />
          ))}
        </ul>
      </div>
      <div>
        <h3>Normal Users:</h3>
        <ul>
          {normalUsers.map((normalUser) => (
            <UserListItem
              key={normalUser.id}
              user={normalUser}
              handleApproval={handleApproval}
              handleRemove={handleRemove}
              isAdmin={false}
            />
          ))}
        </ul>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3 mb-3 text-center">
          <Link to="/register" className="btn btn-primary btn-lg btn-block black_button">
            Add User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;