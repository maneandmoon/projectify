import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ projects, updateInterest, deleteProject }) {
  return (
    <div>
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
          updateInterest={updateInterest}
          deleteProject={deleteProject}
        />
      ))}
    </div>
  );
}

export default ProjectList;
