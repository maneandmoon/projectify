// LoginForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Error, Input, FormField, Label } from '../styles';

// Yup validation schema
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),
  password: Yup.string()
    .required('Password is required'),
});

function LoginForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            setSubmitting(false);
          });
        } else {
          r.json().then((err) => {
            setErrors({ username: err.errors.username, password: err.errors.password });
            setSubmitting(false);
          });
        }
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormField>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          autoComplete="off"
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button
          variant="fill"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Loading...' : 'Login'}
        </Button>
      </FormField>
    </form>
  );
}

export default LoginForm;

// // // import { useState } from "react";
// // import React, { useEffect, useState } from "react";
// import { redirect, useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import * as yup from "yup";

// //useNavigate in react router dom
// // id
// // user_id
// // title
// // description
// // link
// // comments
// // interests

// // use formik and yup
// // yup schema
// function NewProjectForm() {
//     const navigate = useNavigate

//     const schema = yup.object().shape({
//         title: yup.string().required("required"),
//         description: yup.string(),
//         link: yup.string(),
//         comments: yup.string(),
//         interests: yup.string().required("required")

//     })

// //formik hook
//     const formik = useFormik({
//         //need to set initial values
//         initialValues:{
//             title: "",
//             description: "",
//             link: "",
//             comments: "",
//             interests: ""
//         },

//         //set schema
//         validationSchema: schema,
	    
//         //3. create onSubmit callback
// 		//if your page is refreshing make sure you added onSubmit handler to JSX

//         onSubmit: (values) => {
//             console.log(formik.errors)
//             // this is a POST req
//             fetch("http://127.0.0.1:5555/projects", {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify(values),
//             })
//             .then(res => {
//                 if(res.ok){
//                     return res.json()
//                 } else {
//                     console.error("something went wrong with POST projects")
//                 }
//             })
//             .then(data => {
//                 console.log(`/projects/${data.id}`)

//                 navigate(`/projects/${data.id}`)
//             })
//         }
//     })

//     return (
//         <section>
            
//             {/* 4. hook up formik submit, onchange, values, and errors */}

//             <form onSubmit={formik.handleSubmit} className="form" >
// 				<label>Title</label>
// 				<input
// 					type="text"
// 					name="title"
// 					onChange={formik.handleChange}
// 					value={formik.values.title}
// 				/>
// 				{formik.errors.title && formik.touched.title ? (<h3 style={{ color: "red" }}>{formik.errors.title}</h3>) : "" }

//                 <label>Description</label>
// 				<input
// 					type="text"
// 					name="description"
// 					onChange={formik.handleChange}
// 					value={formik.values.description}
// 				/>
// 				{formik.errors.description && formik.touched.description ? (<h3 style={{ color: "red" }}>{formik.errors.description}</h3>) : "" }

//                 <label>Link</label>
// 				<input
// 					type="text"
// 					name="link"
// 					onChange={formik.handleChange}
// 					value={formik.values.link}
// 				/>
// 				{formik.errors.link && formik.touched.link ? (<h3 style={{ color: "red" }}>{formik.errors.link}</h3>) : "" }

//                 <label>Comments</label>
// 				<input
// 					type="text"
// 					name="comments"
// 					onChange={formik.handleChange}
// 					value={formik.values.comments}
// 				/>
// 				{formik.errors.comments && formik.touched.comments ? (<h3 style={{ color: "red" }}>{formik.errors.comments}</h3>) : "" }

//                 <label>Interests</label>
// 				<input
// 					type="text"
// 					name="interests"
// 					onChange={formik.handleChange}
// 					value={formik.values.interests}
// 				/>
// 				{formik.errors.interests && formik.touched.interests ? (<h3 style={{ color: "red" }}>{formik.errors.interests}</h3>) : "" }
            
//             </form>
//         </section>
//     );


// }

//---------------------------------------------------------------

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
// export default NewProjectForm; 