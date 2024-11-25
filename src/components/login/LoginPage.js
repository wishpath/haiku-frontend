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

  function whenSomeoneTriesToLogInWithGoogle(response) { 
    var userObject = LoginUtils.decodeResponse(response);
    if (userObject && LoginUtils.credentialIsValid(userObject)) {
      callLoginFromContext(userObject);
      LoginUtils.displayLogoutButton();
    }
  }

  function whenSomeoneLogsOut() {
    callLogoutFromContext();
    LoginUtils.displayLoginButton();
    LoginUtils.initialiseAndRenderLoginButton(whenSomeoneTriesToLogInWithGoogle);
  }

  useEffect(() => {
    let savedToken;
    if (isLoggedIn) LoginUtils.displayLogoutButton();

    //login from saved token
    else if (savedToken = localStorage.getItem('token')) { 
      const parsedToken = JSON.parse(savedToken);
      if (parsedToken && LoginUtils.credentialIsValid(parsedToken)) {
        console.log("login from saved token in LoginPage.js");
        callLoginFromContext(parsedToken);
        LoginUtils.displayLogoutButton();
        return;
      } else {
        localStorage.removeItem('token');
      }
    }

    //login from google
    else {
      LoginUtils.initialiseAndRenderLoginButton(whenSomeoneTriesToLogInWithGoogle);
      LoginUtils.displayLoginOrLogout(isLoggedIn);
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