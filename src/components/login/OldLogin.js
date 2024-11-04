// src/components/login/OldLogin.js
import React from 'react'; // React component might be used under the hood.
import { useLoginContext } from '../../context/LoginContext'; // Curly braces are used when the name is strict, otherwise could be renamed
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; //function to decode jwt - jason web tokens

const OldLogin = () => {

  // how login is accessed:
  // LoginContext.js -> useContext(createContext()) -> useLoginContext() -> ... REACT MAGIC! ... -> LoginContext.Provider value -> login
  const { callLoginFromContext, callLogoutFromContext } = useLoginContext(); 

  function whenSoemoneTriesToLogInWithGoogle(response) { //response comes from google identity services
    var returnedEncodedUserObject = response.credential;
    var userObject = jwtDecode(returnedEncodedUserObject);
    callLoginFromContext(userObject);
    document.getElementById("signInDiv").hidden = true;
    document.getElementById("signOutDiv").hidden = false;
  }

  function googleLogOut(event) {
    callLogoutFromContext();
    document.getElementById("signInDiv").hidden = false;
    document.getElementById("signOutDiv").hidden = true;
  }

  
  useEffect(
    //the first parameter is the effect itself that we want to run - function
    () => {
      /* global google */ //this comment has to be here, dont remove. defined in index.html as script http://accounts.google.com/gsi/client
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_OATH_CLIENT_ID, // == System.getEnv(REACT_APP_OATH_CLIENT_ID) // this is my authentication for google api
        callback: whenSoemoneTriesToLogInWithGoogle
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        {theme: "outline", size: "large"}
      );
      google.accounts.id.prompt(); //one tap dialog - quicker login
    },
    //the second parameter, if anything in this array changes - it's going to run use effect again
    //but we only want to run this effect once, so we put an empty array  
    [] 
  ) 
  
  return (
    <>     
      <div id="signInDiv"></div>
      <button id="signOutDiv" hidden='true' onClick = {(e) => googleLogOut(e)}>Log out</button>    
    </>
  );   
};

export default OldLogin;