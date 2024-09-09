function ProjectList({ projects, updateInterest, deleteProject }) {
    return (
        <div>
        {projects.map((project) => (
            <div key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <a href={project.link}>Project Link</a>
            <button onClick={() => updateInterest(project)}>Update Interests</button>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
            </div>
        ))}
        </div>
    );
    }

export default ProjectList;