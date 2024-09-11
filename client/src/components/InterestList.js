import React, { useEffect, useState } from 'react';

function InterestList() {
  const [interestedProjects, setInterestedProjects] = useState([]);
  const [error, setError] = useState(null);

//error handling? 
//need to fetch projects from b/e
//filter interested projects
//map over interested proj and render on page

  useEffect(() => {
    fetch("http://localhost:5555/projects") 
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

  return (
    <div>
      <h1>Interest List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {interestedProjects.length > 0 ? (
        <ul>
          {interestedProjects.map((project) => (
            <li key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <a href={project.link}>Project Link</a>
              <div>
                <h3>Interests:</h3>
                <ul>
                  {project.interests.map((interest) => (
                    <li key={interest.id}>{interest.name}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects in the interest list.</p>
      )}
    </div>
  );
}

export default InterestList;

