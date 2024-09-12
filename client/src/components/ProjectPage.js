import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectPage = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null); // State for single project
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Fetch a single project if ID is present
      fetch(`http://127.0.0.1:5555/projects/${id}`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to fetch project");
          }
        })
        .then(data => {
          setProject(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      // Fetch all projects if no ID is present
      fetch(`http://127.0.0.1:5555/projects`)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to fetch projects");
          }
        })
        .then(data => {
          setProjects(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Handle deleting an ind project
  const deleteProject = (id) => {
    fetch(`http://127.0.0.1:5555/projects/${id}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        // Remove deleted project from state
        setProjects(projects.filter(project => project.id !== id));
        if (project && project.id === id) {
          setProject(null); // Clear project if it was the one being viewed
        }
      } else {
        throw new Error("Failed to delete project");
      }
    })
    .catch(err => setError(err.message));
  };

  const addToInterestList = () => {
    if (!project) return; // No project to add

    fetch(`http://127.0.0.1:5555/interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        projectId: projects.id, 
        interestsId: interests.id
      }),
    })
    .then(res => {
      if (res.ok) {
        // Assuming server returns updated interests list
        return res.json();
      } else {
        throw new Error("Failed to add to interest list");
      }
    })
    .then(data => {
      setInterests(data); // Update interests list
      alert('Project added to your interest list');
    })
    .catch(err => setError(err.message));
  };



  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

return (
  <div>
    <h1>{id ? `Project Details` : `Project List`}</h1>
    {id ? (
      // Show single project details if `id` is present
      project ? (
        <div>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <button onClick={() => deleteProject(project.id)}>Delete</button>
          {/* <button onClick={addToInterestList}>Add to Interest List</button> */}
          
        </div>
      ) : (
        <p>No project found</p>
      )
    ) : (
      <ProjectList
        projects={projects}
        deleteProject={deleteProject}
        search={search}
        setSearch={setSearch}
      />
    )}
  </div>
);
};

export default ProjectPage;
