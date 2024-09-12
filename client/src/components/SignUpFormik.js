// SignUpForm.js
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
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
  imageUrl: Yup.string().url('Must be a valid URL').optional(),
});

function SignUpForm({ onLogin }) {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
      imageUrl: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setErrors }) => {
      fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation
        }),
      })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            setSubmitting(false);
          });
        } else {
          r.json().then((err) => {
            setErrors(err.errors);
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
        <Label htmlFor="passwordConfirmation">Password Confirmation</Label>
        <Input
          type="password"
          id="passwordConfirmation"
          autoComplete="current-password"
          {...formik.getFieldProps('passwordConfirmation')}
        />
        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
          <Error>{formik.errors.passwordConfirmation}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Label htmlFor="imageUrl">Profile Image</Label>
        <Input
          type="text"
          id="imageUrl"
          {...formik.getFieldProps('imageUrl')}
        />
        {formik.touched.imageUrl && formik.errors.imageUrl ? (
          <Error>{formik.errors.imageUrl}</Error>
        ) : null}
      </FormField>
      <FormField>
        <Button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Loading...' : 'Sign Up'}
        </Button>
      </FormField>
    </form>
  );
}

export default SignUpForm;