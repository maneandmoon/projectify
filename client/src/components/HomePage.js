import { useEffect, useState } from "react";
// import NavBar from "./NavBar";
import Search from "./Search";
import ProjectList from "./ProjectList";
// import NewProjectForm from "./NewProjectForm";
// import InterestsList from "./InterestsList";
import { NavLink } from "react-router-dom";

function HomePage() {
const [projects, setProjects] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
    fetch("http://localhost:3000/projects") 
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

const addProject = (newProject) => {
    setProjects([...projects, newProject]);
};

const updateSearch = (newSearch) => setSearch(newSearch);
const filteredProjects = projects.filter((project) => {
    return (
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase())
    );
});

function updateInterest(updatedProject) {
    setProjects(
    projects.map((prevProject) => {
        if (updatedProject.id === prevProject.id) {
        return { ...prevProject, interests: updatedProject.interests };
        } else {
        return prevProject;
        }
    })
    );
}

const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
};

return (
    <>
    {/* <NavBar /> */}
    <h1>Projectify</h1>
    <div>
        <Search search={search} updateSearch={updateSearch} />

        {/* <NewProjectForm addProject={addProject} /> */}

        <ProjectList
        projects={filteredProjects}
        updateInterest={updateInterest}
        deleteProject={deleteProject}
        />
        <NavLink to="/InterestsList" className="button">Go to InterestsList</NavLink>
        <NavLink to="/NewProject" className="button">Go to New Project Form</NavLink>
    </div>
    </>
);
}

export default HomePage;