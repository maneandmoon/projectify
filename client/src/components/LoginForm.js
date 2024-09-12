import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Error, Input, FormField, Label } from "../styles";

const LoginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

function LoginForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => setErrors({ api: err.errors }));
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
          name="username"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && formik.touched.username ? (
          <Error>{formik.errors.username}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <Error>{formik.errors.password}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Button variant="fill" color="primary" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Login"}
        </Button>
      </FormField>

      <FormField>
        {formik.errors.api && formik.errors.api.map((err, index) => (
          <Error key={index}>{err}</Error>
        ))}
      </FormField>
    </form>
  );
}

export default LoginForm;
