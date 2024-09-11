import React from 'react';

function ProjectCard({ project, updateInterest, deleteProject, onAddToInterestList }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.link}>Project Link</a>
      <div>
        <h3>Interests:</h3>
        <ul>
          {project.interests && project.interests.map((interest) => (
            <li key={interest.id}>{interest.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => updateInterest(project)}>Update Interests</button>
      <button onClick={() => deleteProject(project.id)}>Delete</button>
      <button onClick={() => onAddToInterestList(project)}>Add to Interest List</button> {/* New button */}
    </div>
  );
}

export default ProjectCard;
