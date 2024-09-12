import React from 'react';
import SignUpFormik from './SignUpFormik'; 

function SignUpPage({ onLogin }) {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpFormik onLogin={onLogin} />
    </div>
  );
}

export default SignUpPage;
