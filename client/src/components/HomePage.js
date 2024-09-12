import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard"; 
import ProjectList from './ProjectList';

function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [interestList, setInterestList] = useState([]);
  
  useEffect(() => {
    fetch("http://127.0.0.1:5555/featured-projects")
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch featured projects");
        }
      })
      .then(data => setFeaturedProjects(data))
      .catch(err => console.error("Unable to reach the server:", err));
  }, []);

  const deleteProject = (id) => {
    setFeaturedProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id)
    );
  };

  const onAddToInterestList = (project) => {
    setInterestList((prevInterestList) => [...prevInterestList, project]);

    //add project to interst list
    // Navigate to interest list page or perform additional actions if needed
  };

  return (
    <div>
      <section style={{ textAlign: 'center', marginBottom: '20px' }}>
      <h1 style={{ fontSize: '3em' }}>Projectify</h1>
        <p style={{ fontSize: '1.2em', color: '#555' }}>
          Link up with peers who have similar project goals and interests to drive collaboration and innovation.
        </p>
      </section>
      <section style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Featured Projects</h2>
      </section>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          listStyleType: "none",
          padding: 0,
        }}
      >
        {featuredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            deleteProject={deleteProject}
            onAddToInterestList={onAddToInterestList}
            showAddToInterestList={true}
            showDelete={true}
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;


