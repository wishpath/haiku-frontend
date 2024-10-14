// src/components/login/OldLogin.js


import 
  React, // React component might be used under the hood.
  { useState } // Curly braces are used when the name is strict, otherwise could be renamed
  from 'react';
import { useLogin } from '../../context/LoginContext';
import LoginButton from './Login';
import LogoutButton from './Logout';
import { useEffect } from 'react';
import { gapi } from 'gapi-script';
const clientId = process.env.REACT_APP_OATH_CLIENT_ID;

const OldLogin = () => {
  console.log('OldLogin, clientId:', clientId);
  //initialise a client
  //supposed to run when our app runs
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "" //gonna be different if i'm actually using different api's
      })
    };

    gapi.load('client.auth2', start)
  })

  //var accessToken = gapi.auth.getToken().accessToken;

  
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
    <>
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
      <br></br>
      <LoginButton/>
      <br></br>
      <LogoutButton/>
    </>
  );
};

export default OldLogin;
