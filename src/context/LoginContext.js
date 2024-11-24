// src/context/LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginUtils } from './../components/login/tool/LoginUtils';

//creates context Object. This object has two components: Provider and Consumer
//Provider provides way to share State
//Consumer allows components to subscribe to context changes
//does not hold the values itself, the actual state and values are stored within the LoginProvider
const LoginContext = createContext();

//defines a custom hook that allows components to access the LoginContext values easily
//somehow through useLogin a function 'login' (within LoginPorvider) is accessed like: "const { login } = useLogin();"
//how? magic. `useContext()` uses Ract magic to access `LoginProvider`.
export const useLoginContext = () => useContext(LoginContext);


//children - refers to the child components that are nested inside the LoginProvider component
export const LoginProvider = ({ children }) => {
  const [userObject, setUserObject] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkSavedTokenForContext = () => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const parsedToken = JSON.parse(savedToken);
      if (parsedToken && LoginUtils.credentialIsValid(parsedToken)) {
        console.log("logged in (from local storage)");
        callLoginFromContext(parsedToken);
      } else {
        localStorage.removeItem('token');
      }
    }
  }
  
  const callLoginFromContext = (userObject) => {
    setUserObject(userObject);
    setIsLoggedIn(true);
    localStorage.setItem('token', JSON.stringify(userObject));
  };

  
  const callLogoutFromContext = () => {
    console.log("logged out");
    setUserObject('');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  useEffect(
    () => { //the first parameter is the effect itself that we want to run - function
      if (isLoggedIn) {
        return;
      }
      checkSavedTokenForContext();
    },[] 
  )

  return (
    //formulates LoginProvider as Component like: <LoginProvider> under only it,  the context will be available in the App.js
    //listing username, isLoggedIn, login, logout that will be available by useLogin hook
    //value prop of the LoginContext.Provider is the one that actually stores username, isLoggedIn, login, logout
    <LoginContext.Provider value={{ userObject, isLoggedIn, callLoginFromContext, callLogoutFromContext, checkSavedTokenForContext }}>
      {/*represents any components nested inside the LoginProvider
      indicating that these child components will have access to the context values provided by the LoginContext.Provider*/}
      {children}
    </LoginContext.Provider>
  );
};
