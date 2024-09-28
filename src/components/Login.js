// src/components/Login.js
import React, { useState } from 'react';
import { useLogin } from '../context/LoginContext'; // Import your context

const Login = () => {
  const { login } = useLogin(); // Get the login function from context
  const [inputUsername, setInputUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(inputUsername); // Call login with the username
    setInputUsername(''); // Clear the input
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="text" 
        value={inputUsername} 
        onChange={(e) => setInputUsername(e.target.value)} 
        placeholder="Enter username" 
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
