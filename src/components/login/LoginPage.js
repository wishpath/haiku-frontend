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
    LoginUtils.displayLogoutButton();
  }

  function whenSomeoneLogsOut(event) {
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
      if (parsedToken && parsedToken.exp > Math.floor(Date.now() / 1000)) { //!! create my own JWT validator!!!
        console.log("login from saved token");
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