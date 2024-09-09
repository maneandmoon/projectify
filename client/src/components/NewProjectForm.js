import { useState } from "react";

// id
// user_id
// title
// description
// link
// comments
// interests

function NewProjectForm({ addProject }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = { title, description, link };
        fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
        })
        .then((res) => res.json())
        .then((data) => addProject(data));
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        />
        <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
        />
        <button type="submit">Add Project</button>
        </form>
    );
    }
export default NewProjectForm; 