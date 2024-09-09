// import React, { useState, useEffect } from 'react';
// // import { getUserById } from '../../api'; // Assume you have an API utility to fetch data

// const UserProfile = ({ userId }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const data = await getUserById(userId);
//       setUser(data);
//     };
//     fetchUser();
//   }, [userId]);

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{user.username}</h1>
//       <img src={user.avatar} alt={`${user.username}'s avatar`} />
//       <p>{user.bio}</p>
//       {/* Render user's projects and interests */}
//     </div>
//   );
// };

// export default UserProfile;
