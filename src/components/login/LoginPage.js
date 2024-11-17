// src/components/login/LoginPage.js
import React from 'react'; // React component might be used under the hood.
import { useLoginContext } from '../../context/LoginContext'; // Curly braces are used when the name is strict, otherwise could be renamed
import { useEffect } from 'react';
import './tool/LoginPage.css';
import { LoginUtils } from './tool/LoginUtils';

const LoginPage = () => {

  // how login is accessed:
  // LoginContext.js -> useContext(createContext()) -> useLoginContext() -> ... REACT MAGIC! ... -> LoginContext.Provider value -> login
  const { isLoggedIn, callLoginFromContext, callLogoutFromContext } = useLoginContext();

  function whenSomeoneTriesToLogInWithGoogle(response) { //response comes from google identity services
    var returnedEncodedUserObject = response.credential;
    if (!returnedEncodedUserObject) {
      console.log("missing credential");
      return; 
    }
    var userObject = LoginUtils.decodeEncodedUserObject(returnedEncodedUserObject);
    if (!userObject) {
      console.log("invalid JWT (JSON web token) format");
      return;
    }
    if (!LoginUtils.credentialIsValid(userObject)) return;
    console.log(userObject); //should not go to prod!!!
    callLoginFromContext(userObject);
    document.getElementById("LogInDiv").style.display = 'none';
    document.getElementById("LogOutDiv").hidden = false;
    document.getElementById("LogOutButton").hidden = false;
  }

  function googleLogOut(event) {
    callLogoutFromContext();
    document.getElementById("LogInDiv").style.display = 'flex';
    document.getElementById("LogOutDiv").hidden = true;
    document.getElementById("LogOutButton").hidden = true;
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OATH_CLIENT_ID, // == System.getEnv(REACT_APP_OATH_CLIENT_ID) // this is my authentication for google api
      callback: whenSomeoneTriesToLogInWithGoogle
    });
    google.accounts.id.renderButton(
      document.getElementById("LogInDiv"),
      {theme: "outline", size: "large"}
    );
  }

   
  useEffect(
    //the first parameter is the effect itself that we want to run - function
    () => {
      if (isLoggedIn) {
        document.getElementById("LogInDiv").style.display = 'none';
        document.getElementById("LogOutDiv").hidden = false;
        return;
      }

      //login from saved token
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        const parsedToken = JSON.parse(savedToken);
        if (parsedToken && parsedToken.exp > Math.floor(Date.now() / 1000)) { //!! create my own JWT validator!!!
          console.log("login from saved token");
          callLoginFromContext(parsedToken);
          document.getElementById("LogInDiv").style.display = 'none';
          document.getElementById("LogOutDiv").hidden = false;
          return;
        } else {
          localStorage.removeItem('token');
        }
      }

      /* global google */ //this comment has to be here, dont remove. defined in index.html as script http://accounts.google.com/gsi/client
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_OATH_CLIENT_ID, // == System.getEnv(REACT_APP_OATH_CLIENT_ID) // this is my authentication for google api
        callback: whenSomeoneTriesToLogInWithGoogle
      });
      google.accounts.id.renderButton(
        document.getElementById("LogInDiv"),
        {theme: "outline", size: "large"}
      );
      if (!isLoggedIn) google.accounts.id.prompt(); //one tap dialog - quicker login
      document.getElementById("LogInDiv").style.display = isLoggedIn ? 'none' : 'flex';
      document.getElementById("LogOutDiv").hidden = !isLoggedIn;
      document.getElementById("LogOutButton").hidden = !isLoggedIn;
    },
    //the second parameter, if anything in this array changes - it's going to run use effect again
    //but we only want to run this effect once, so we put an empty array  
    [] 
  )
  
  return (
    <>     
      <div id="LogInDiv"></div> 
      <div id="LogOutDiv">
        <button id="LogOutButton" onClick = {(e) => googleLogOut(e)}>Log out</button>   
      </div>
    </>
  );   
};

export default LoginPage;