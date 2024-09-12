import React from 'react';

function UserCard({ user }) {
  return (
    <li
      style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        margin: "10px",
        padding: "10px",
        width: "300px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{user.username}</h3>
      <p>{user.bio || 'No bio available'}</p>
    </li>
  );
}

export default UserCard;