import React from 'react';
import ProjectCard from './ProjectCard';
import Search from './Search';

function ProjectList({ projects, updateInterest, deleteProject, search, setSearch }) {
  // Ensure that the search term is always a string
  const searchTerm = search || '';

  // Filter projects based on the search query

  const filteredProjects = projects.filter(project => {
    // Use default empty strings if project.title or project.description is undefined
    const title = project?.title || '';
    const description = project?.description || '';

    return (
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      {setSearch && <Search search={search} updateSearch={setSearch} />}
      {filteredProjects.length > 0 ? (
        filteredProjects.map(project => (
          <ProjectCard
            key={project.id}
            project={project}
            updateInterest={updateInterest}
            deleteProject={deleteProject}
            onAddToInterestList={() => {}} 
          />
        ))
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}

export default ProjectList;
