import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  // Fetch projects from backend
  useEffect(() => {
    fetch("http://localhost:5555/projects")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch projects");
        }
      })
      .then(data => setProjects(data))
      .catch(err => setError(err.message));
  }, []);

  // Handle deleting a project
  const deleteProject = (id) => {
    fetch(`http://localhost:5555/projects/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        // Remove deleted project from state
        setProjects(projects.filter(project => project.id !== id));
      } else {
        throw new Error("Failed to delete project");
      }
    })
    .catch(err => setError(err.message));
  };

  return (
    <div>
      <h1>Project List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ProjectList
        projects={projects}
        deleteProject={deleteProject}
        search={search}
        setSearch={setSearch}
      />
    </div>
  );
};

export default ProjectPage;
