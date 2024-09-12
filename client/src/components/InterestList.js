import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';

function InterestList() {
  const [interestedProjects, setInterestedProjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5555/interests")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch projects");
        }
      })
      .then((data) => {
        const projectsWithInterests = data.filter(project => project.interests.length > 0);
        setInterestedProjects(projectsWithInterests);
      })
      .catch((err) => setError(err.message));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5555/projects/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setInterestedProjects(interestedProjects.filter(project => project.id !== id));
        } else {
          throw new Error('Failed to delete the project');
        }
      })
      .catch((err) => setError(err.message));
  };

return (
  <div style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
    <h1 style={{ textAlign: 'center', color: '#333' }}>Interest List</h1>
    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    {interestedProjects.length > 0 ? (
      <ul style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', listStyleType: 'none', padding: 0 }}>
        {interestedProjects.map((project) => (
          <li key={project.id} style={{ margin: '10px' }}>
            <ProjectCard
              project={project}
              deleteProject={handleDelete}
              showDelete={true}
              showAddToInterestList={false} // Hide Add to Interest List button
            />
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ textAlign: 'center' }}>No projects in the interest list.</p>
    )}
  </div>
);
}
export default InterestList;


