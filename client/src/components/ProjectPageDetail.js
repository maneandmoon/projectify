import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProjectPageDetail() {
	const [project, setProject] = useState({
		projects: []
	});

	// 4a. fetch current production based on params
	// params.id
	const params = useParams()
	
	// 4c. if response is not ok, navigate to /not-found
	useEffect(() => {
		fetch(`http://127.0.0.1:5555/projects/${params.id}`)
		.then(res => {
			if(res.ok){
				return res.json()
			}
		})
		.then(data => setProjects(data))
	}, [])

	// 4b. destructure the values and display them on page    
    const { id, user_id, title, description, link, is_featured, interests, interest_names, user } = project;
	
	return (
		<div className="project-detail" id={id}>
			<h1>{title}</h1>
			<p>{description}</p>

			<div className="project-card">
				{/* <figure className="image">
					<img src={image} alt={title} /> */}
					<section>
						<p>Link: {link}</p>
						<p>Interests: {interests}</p>
					</section>
				{/* </figure> */}
				
			</div>
		</div>
	);
}

export default ProjectPageDetail;