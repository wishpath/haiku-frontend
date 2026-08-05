// src/components/login/LoginPage.js
import React from 'react'; // React component might be used under the hood.
import { useLoginContext } from '../../context/LoginContext'; // Curly braces are used when the name is strict, otherwise could be renamed
import { useEffect } from 'react';
import './tool/LoginPage.css';
import { LoginUtils } from './tool/LoginUtils';
import haikuService from '../haiku/tool/ServiceHaiku';

const LoginPage = () => {
  const { isLoggedIn, setUserAsLoggedIn, setLoggedOutState } = useLoginContext(); // those are defined in LoginContext.js

  function whenSomeoneTriesToLogInWithGoogle(response) {

    //backend authentication
    try {
      //await here waits for the finished actions and returns concrete result (not a Promise)
      const backendAuthorisationResponse = await haikuService.backendAuthenticate(response.credential);
      const responseCode = backendAuthorisationResponse.status;
      if (responseCode === 401) console.log("Authentication failed: unauthorized, code: 401");
      else if (responseCode !== 200) console.log("Authentication failed: response code " + responseCode);
      else {
        let userObject = backendAuthorisationResponse.data; //axios parses json text to object here
        if (!userObject) {
          console.log("Backend returned empty user object");
          return;
        }
        setUserAsLoggedIn(userObject);
        LoginUtils.displayLogoutButton();
        console.log("Authorized successfully using backend")
        return;
      }
    } 
    catch (error) {
      console.log("backend authorisation has failed");
    }
    
    // temporary fallback: remove after backend authentication is stable
    // old frontend authentication


    var decodedIdToken = LoginUtils.decodeResponse(response);
    if (decodedIdToken && LoginUtils.isCredentialValid(decodedIdToken)) {
      setUserAsLoggedIn(decodedIdToken);
      LoginUtils.displayLogoutButton();
    }
  }

  function whenSomeoneLogsOut() {
    setLoggedOutState();
    LoginUtils.displayLoginButton();
    LoginUtils.initialiseAndRenderLoginButton(whenSomeoneTriesToLogInWithGoogle);
  }

  useEffect(() => {
    let savedToken;
    if (isLoggedIn) LoginUtils.displayLogoutButton();

    //login from saved token
    else if (savedToken = localStorage.getItem('token')) { 
      const parsedToken = JSON.parse(savedToken);
      if (parsedToken && LoginUtils.isCredentialValid(parsedToken)) {
        setUserAsLoggedIn(parsedToken);
        LoginUtils.displayLogoutButton();
        return;
      } else {
        localStorage.removeItem('token');
      }
    }

    //login from google
    else {
      LoginUtils.initialiseAndRenderLoginButton(whenSomeoneTriesToLogInWithGoogle);
      LoginUtils.displayLoginOrLogout_dependentOnState(isLoggedIn);
    }
  }, [])

  return (
    <>
      <div id="LogInDiv"></div>
      <div id="LogOutDiv">
        <button id="LogOutButton" onClick={(e) => whenSomeoneLogsOut(e)}>Log out</button>
      </div>
    </>
  );
};

export default LoginPage;