// // import { useState } from "react";
// import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import InterestList from './InterestList';

//useNavigate in react router dom
// id
// user_id
// title
// description
// link
// comments
// interests

// use formik and yup
// yup schema
function NewProjectForm() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().max(25, "must be less than 25 characters"),
        link: yup.string().required("Invalid URL"),
        // link: yup.string().url("Invalid URL"),
        // link: yup.string()
        // .test('is-valid-url', 'Invalid URL', value => {
        //   if (!value) return true; // Allow empty values if not required
        //   try {
        //     new URL(value); // Validate URL
        //     return true;
        //   } catch (e) {
        //     return false;
        //   }
        // }),
        comments: yup.string().max(100, "must be less than 100 characters"),
        interests: yup.string().required("At least one interest is required")
        // interests: yup.array().of(yup.string()).required("At least one interest is required")
    })

//formik hook
    const formik = useFormik({
        //need to set initial values
        initialValues:{
            title: "",
            description: "",
            // link: "",
            comments: "",
            interests: ""   //interests field as array //add and update interests?
        },

        //set schema
        validationSchema: schema,
	    
        //3. create onSubmit callback
		//if your page is refreshing make sure you added onSubmit handler to JSX

        onSubmit: (values) => {
            console.log(formik.errors)
            // this is a POST req
            fetch("http://127.0.0.1:5555/projects", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    console.error("something went wrong with POST projects")
                }
            })
            .then(data => {
                console.log(`/projects/${data.id}`)

                navigate(`/projects/${data.id}`)
            })
        }
    });

    const handleAddInterest = (interest) => {
        formik.setFieldValue('interests', [...formik.values.interests, interest]);
    };

    const handleRemoveInterest = (index) => {
        const updatedInterests = formik.values.interests.filter((_, i) => i !== index);
        formik.setFieldValue('interests', updatedInterests);
    };

    return (
        <section>
            
            {/* 4. hook up formik submit, onchange, values, and errors */}

            <form onSubmit={formik.handleSubmit} className="form" >
				<label>Title</label>
				<input
					type="text"
					name="title"
					onChange={formik.handleChange}
					value={formik.values.title}
				/>
				{formik.errors.title && formik.touched.title ? (<h3 style={{ color: "red" }}>{formik.errors.title}</h3>) : "" }

                <label>Description</label>
				<input
					type="text"
					name="description"
					onChange={formik.handleChange}
					value={formik.values.description}
				/>
				{formik.errors.description && formik.touched.description ? (<h3 style={{ color: "red" }}>{formik.errors.description}</h3>) : "" }

                <label>Link</label>
				<input
					type="text"
					name="link"
					onChange={formik.handleChange}
					value={formik.values.link}
				/>
				{formik.errors.link && formik.touched.link ? (<h3 style={{ color: "red" }}>{formik.errors.link}</h3>) : "" }

                <label>Comments</label>
				<input
					type="text"
					name="comments"
					onChange={formik.handleChange}
					value={formik.values.comments}
				/>
				{formik.errors.comments && formik.touched.comments ? (<h3 style={{ color: "red" }}>{formik.errors.comments}</h3>) : "" }

                <label>Interests</label>
				<input
					type="text"
					name="interests"
					onChange={formik.handleChange}
					value={formik.values.interests}
				/>
				{formik.errors.interests && formik.touched.interests ? (<h3 style={{ color: "red" }}>{formik.errors.interests}</h3>) : "" }
                
                <button type="submit">Submit</button>
            
            </form>
        </section>
    );


}


// function NewProjectForm({ addProject }) {
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [link, setLink] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newProject = { title, description, link };
//         fetch("http://localhost:3000/projects", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newProject),
//         })
//         .then((res) => res.json())
//         .then((data) => addProject(data));
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//         <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//         />
//         <input
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//             type="text"
//             placeholder="Link"
//             value={link}
//             onChange={(e) => setLink(e.target.value)}
//         />
//         <button type="submit">Add Project</button>
//         </form>
//     );
//     }
export default NewProjectForm; 