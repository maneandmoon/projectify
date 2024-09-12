import { useState, useEffect } from "react";
import ProjectCard from "./ProjectCard"; // Ensure the path is correct

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
    // Navigate to interest list page or perform additional actions if needed
  };

  return (
    <div>
      <section>
        <h1>Projectify</h1>
      </section>
      <section>
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
            // Add updateInterest if needed
          />
        ))}
      </ul>
    </div>
  );
}

export default HomePage;


