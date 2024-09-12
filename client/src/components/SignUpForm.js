import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Error, Input, FormField, Label } from "../styles";

const SignUpSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Password confirmation is required"),
});

function SignUpForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        }),
      })
        .then((r) => {
          setSubmitting(false);
          if (r.ok) {
            r.json().then((user) => onLogin(user));
          } else {
            r.json().then((err) => {
              setErrors({ api: err.errors });
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
        <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
        <Input
          type="password"
          name="passwordConfirmation"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
        />
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation ? (
          <Error>{formik.errors.passwordConfirmation}</Error>
        ) : null}
      </FormField>

      <FormField>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Loading..." : "Sign Up"}
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

export default SignUpForm;