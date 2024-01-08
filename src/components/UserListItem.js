import React from 'react';

const UserListItem = ({ user, handleApproval, handleRemove, isAdmin }) => (
  <li key={user.id}>
    {user.username} - {user.approved ? 'Approved' : 'Not Approved'}
    {!user.approved && (
      <>
        <button onClick={() => handleApproval(user.id)}>
          {isAdmin ? 'Approve Admin User' : 'Approve Normal User'}
        </button>
        <button onClick={() => handleRemove(user.id, isAdmin)}>
          {isAdmin ? 'Remove Admin User' : 'Remove Normal User'}
        </button>
      </>
    )}
  </li>
);

export default UserListItem;
