import { redirect, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";


function NewProjectForm() {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().max(25, "must be less than 25 characters"),
        link: yup.string().required("Invalid URL"),
        interests: yup.string().required("At least one interest is required")
        // interests: yup.array().of(yup.string())
    })

    const formik = useFormik({
        //need to set initial values
        initialValues:{
            title: "",
            description: "",
            link: "",
            interests: ""   
        },

        //set schema
        validationSchema: schema,
	    
        //3. create onSubmit callback
		//if your page is refreshing make sure you added onSubmit handler to JSX

        onSubmit: (values) => {
            // console.log(formik.errors)

            fetch("http://127.0.0.1:5555/projects", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({...values, user_id: 1})
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                } else {
                    console.error("something went wrong with POST projects")
                }
            })
            .then(data => {
                if (data && data.id) {
                    navigate(`/projects/${data.id}`);
                } else {
                    throw new Error("Project ID not returned from server");
                }
            })
            .catch(err => {
                console.error(err);
                // Handle error (e.g., show an error message to the user)
                alert(`Error: ${err.message}`);
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

export default NewProjectForm; 