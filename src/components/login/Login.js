// src/components/login/Login.js



import 
  React, // React component might be used under the hood.
  { useState } // Curly braces are used when the name is strict, otherwise could be renamed
  from 'react';
import { useLogin } from '../../context/LoginContext';

const Login = () => {
  // how login is accessed:
  // LoginContext.js -> useContext(createContext()) -> useLogin() -> ... REACT MAGIC! ... -> LoginContext.Provider value -> login
  const { login } = useLogin(); 
  const [inputUsername, setInputUsername] = useState('');

  // event object
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the form from submitting
    login(inputUsername); // Call LoginContext.login() to set username
    setInputUsername(''); // Clear the input
  };

  return (
    //onSubmit attribute is a shorthand provided by React, so <form onSubmit={handleLogin(onSubmit)}> in't needed
    //If you use <form onSubmit={handleLogin(onSubmit)}>, it will not prevent the default form submission
    //handleLogin(onSubmit) would be excuted during render phase
    <form onSubmit={handleLogin}>
      <input 
        type="text"
        //will display whatever is in the variable "imputUsername"
        value={inputUsername}
        //after adding a letter, whatever is displayed will be stored in the variable "imputUsername"
        onChange={(e) => setInputUsername(e.target.value)}
        placeholder="Enter username" 
      />
      <button type="submit">{"Login" + (inputUsername ? (" as " + inputUsername) : "") }</button>
    </form>
  );
};

export default Login;
