import React from 'react';
// import './ProjectCard.css'; 

// id
// user_id
// title
// description
// link
// comments
// interests

function ProjectCard({ project, updateInterest, deleteProject }) {
  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <a href={project.link}>Project Link</a>
      {/* <div>
        <h3>Comments:</h3>
        <ul>
          {project.comments.map(comment => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div> */}
      <div>
        <h3>Interests:</h3>
        <ul>
          {project.interests.map(interest => (
            <li key={interest.id}>{interest.name}</li>
          ))}
        </ul>
      </div>
      <button onClick={() => updateInterest(project)}>Update Interests</button>
      <button onClick={() => deleteProject(project.id)}>Delete</button>
    </div>
  );
}

export default ProjectCard;
