// import React, { useState, useEffect } from 'react';
// import { getProjectById } from '../../api';

// const ProjectDetail = ({ projectId }) => {
//   const [project, setProject] = useState(null);

//   useEffect(() => {
//     const fetchProject = async () => {
//       const data = await getProjectById(projectId);
//       setProject(data);
//     };
//     fetchProject();
//   }, [projectId]);

//   if (!project) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{project.title}</h1>
//       <p>{project.description}</p>
//       <a href={project.link} target="_blank" rel="noopener noreferrer">Project Link</a>
//       {/* Render project's comments and interests */}
//     </div>
//   );
// };

// export default ProjectDetail;