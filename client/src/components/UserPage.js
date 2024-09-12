import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/users")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch users");
        }
      })
      .then(data => setUsers(data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h1>User List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserPage;