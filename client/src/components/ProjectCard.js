import React from 'react';

function ProjectCard({ project, deleteProject, onAddToInterestList, showAddButton, showDelete, showAddToInterestList, }) {
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
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        Project Link
      </a>
      {/* <button onClick={() => deleteProject(project.id)}>Delete</button>
      <button onClick={() => onAddToInterestList(project)}>Add to Interest List</button> {/* Pass the project */}
      {/* {showAddButton && (
        <button onClick={() => onAddToInterestList(project)}>Add to Interest List</button>
      // )} */}
    {/* </li> */} 

      {showDelete && <button onClick={() => deleteProject(project.id)}>Delete</button>}
      {showAddToInterestList && <button onClick={() => onAddToInterestList(project)}>Add to Interest List</button>}
    </li>
  );
}


export default ProjectCard;
