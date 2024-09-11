import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ProjectList from "./ProjectList";
import Search from "./Search"

function HomePage() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [interestList, setInterestList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5555/projects")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error("Could not fetch the data from promise");
        }
      })
      .then((data) => setProjects(data))
      .catch((err) =>
        console.error("Was unable to reach the server for GET Request")
      );
  }, []);

  const addToInterestList = (project) => {
    setInterestList([...interestList, project]);
    navigate("/interest-list");
  };

  const updateInterestList = (updatedProject) => {
    setInterestList((prevInterestList) =>
      prevInterestList.map((project) =>
        updatedProject.id === project.id ? updatedProject : project
      )
    );
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  const featuredProjects = projects.filter((project) => project.isFeatured);

  return (
    <>
      <h1>Projectify</h1>
      <div>
        <section>
          <h2>Featured Projects</h2>
          <ProjectList
            projects={featuredProjects}
            updateInterest={updateInterestList}
            deleteProject={deleteProject}
            onAddToInterestList={addToInterestList}
          />
        </section>

        <NavLink to="/projects" className="button">View All Projects</NavLink>
      </div>
    </>
  );
}

export default HomePage;

