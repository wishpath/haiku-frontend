// src/components/login/LoginPage.js
import React from 'react'; // React component might be used under the hood.
import { useLoginContext } from '../../context/LoginContext'; // Curly braces are used when the name is strict, otherwise could be renamed
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; //function to decode jwt - jason web tokens
import './tool/LoginPage.css';

const LoginPage = () => {

  // how login is accessed:
  // LoginContext.js -> useContext(createContext()) -> useLoginContext() -> ... REACT MAGIC! ... -> LoginContext.Provider value -> login
  const { isLoggedIn, callLoginFromContext, callLogoutFromContext } = useLoginContext();
  const {localLogIn, setLocalLogin} = useState(isLoggedIn);

  function whenSoemoneTriesToLogInWithGoogle(response) { //response comes from google identity services
    var returnedEncodedUserObject = response.credential;
    var userObject = jwtDecode(returnedEncodedUserObject);
    callLoginFromContext(userObject);
    setLocalLogin(true);
    document.getElementById("LogInDiv").style.display = 'none';
    document.getElementById("LogOutDiv").hidden = false;
    document.getElementById("LogOutButton").hidden = false;
  }

  function googleLogOut(event) {
    callLogoutFromContext();
    document.getElementById("LogInDiv").style.display = 'flex';
    document.getElementById("LogOutDiv").hidden = true;
    document.getElementById("LogOutButton").hidden = true;
  }

   
  useEffect(
    //the first parameter is the effect itself that we want to run - function
    () => {
      // if (isLoggedIn) {
      //   console.log("User is already logged in. Skipping Google login initialization.");
      //   return;
      // }
      /* global google */ //this comment has to be here, dont remove. defined in index.html as script http://accounts.google.com/gsi/client
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_OATH_CLIENT_ID, // == System.getEnv(REACT_APP_OATH_CLIENT_ID) // this is my authentication for google api
        callback: whenSoemoneTriesToLogInWithGoogle
      });
      google.accounts.id.renderButton(
        document.getElementById("LogInDiv"),
        {theme: "outline", size: "large"}
      );
      google.accounts.id.prompt(); //one tap dialog - quicker login
      document.getElementById("LogInDiv").style.display = isLoggedIn ? 'none' : 'flex';
      document.getElementById("LogOutDiv").hidden = isLoggedIn;
      document.getElementById("LogOutButton").hidden = isLoggedIn;
    },
    //the second parameter, if anything in this array changes - it's going to run use effect again
    //but we only want to run this effect once, so we put an empty array  
    [] 
  ) 
  
  return (
    <>     
   
        <div id="LogOutDiv">
          <button id="LogOutButton" hide='true' onClick = {(e) => googleLogOut(e)}>Log out</button>   
        </div>
        
        <div id="LogInDiv"></div> 
      
    </>
  );   
};

export default LoginPage;