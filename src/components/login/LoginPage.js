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

  function decodeEncodedUserObject(returnedEncodedUserObject) {
    try {
      return jwtDecode(returnedEncodedUserObject);
    } catch (error) {
        console.error("Invalid JWT format:", error);
        return null;
    }
  }

  function returnedCredentialIsValid(userObject) {
    const clientId = process.env.REACT_APP_OATH_CLIENT_ID;
    if (userObject.aud !== clientId) return false; // Check if audience (aud) matches the app's client ID
    const currentTime = Math.floor(Date.now() / 1000); 
    if (!userObject.exp || userObject.exp < currentTime) return false; // Check if token has expired
    if (!userObject.email_verified) return false; // check if the email is verified
    return true;
  }


  function whenSomeoneTriesToLogInWithGoogle(response) { //response comes from google identity services
    var returnedEncodedUserObject = response.credential;
    if (!returnedEncodedUserObject) return; //missing credential
    var userObject = decodeEncodedUserObject(returnedEncodedUserObject);
    if (!userObject) return; //invalid JWT (JSON web token) format
    if (!returnedCredentialIsValid(userObject)) return;
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
  }

   
  useEffect(
    //the first parameter is the effect itself that we want to run - function
    () => {
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