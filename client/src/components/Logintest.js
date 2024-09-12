import React from 'react';
import LoginFormik from './LoginFormik'; 

function Login({ onLogin }) {
  return (
    <div>
      <h1>Login</h1>
      <LoginFormik onLogin={onLogin} />
    </div>
  );
}

export default Login;
