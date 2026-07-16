// src/context/LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoginUtils } from './../components/login/tool/LoginUtils';

//creates context Object. This object has two components: Provider and Consumer
//Provider provides way to share State
//Consumer allows components to subscribe to context changes
//overall acts like a channel of communication (does not hold login state)
const LoginContext = createContext();

//through this "useLoginContext()" will be accessed:
  // provider 
  // a.k.a <LoginProvider> 
  // a.k.a {{ userObject, isLoggedIn, callLoginFromContext, callLogoutFromContext, checkSavedTokenForContext }}
export const useLoginContext = () => useContext(LoginContext);


//children - refers to the child components that are nested inside the LoginProvider component
//This will return <LoginProvider> component (userd in App.js), this component will provide context for all child elements.
export const LoginProvider = ({ children }) => {

  //the actual login state lives in tese object (within array)
  const [userObject, setUserObject] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loadSavedLocalToken = () => {
    const savedLocalToken = localStorage.getItem('token');
    if (savedLocalToken) {
      const parsedLocalToken = JSON.parse(savedLocalToken);
      if (parsedLocalToken && LoginUtils.isCredentialValid(parsedLocalToken)) {
        setUserAsLoggedIn(parsedLocalToken);
      } 
      else {
        localStorage.removeItem('token');
      }
    }
  }
  
  const setUserAsLoggedIn = (userObject) => {
    setUserObject(userObject);
    setIsLoggedIn(true);
    localStorage.setItem('token', JSON.stringify(userObject));
  };

  
  const setLoggedOutState = () => {
    setUserObject('');
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  useEffect(
    //the first parameter is the effect itself that we want to run - function
    () => { 
      if (isLoggedIn) {
        return;
      }
      loadSavedLocalToken();
    },
    
    //Dependency array. Controls when useEffect re-runs; empty = run once on mount (elements first load). some objects inside = run each time they change
    //In this specific case this effect takes place when LoginProvider loads, so basically when the whole app loads.
    [] 
  )

  return (
    //formulates LoginProvider as Component: "<LoginProvider>"
      // under only it,
        //child components (see App.js) will get access to
          //useLoginContext()
            // a.k.a provider 
            // a.k.a <LoginProvider> 
            // a.k.a {{ userObject, isLoggedIn, callLoginFromContext, callLogoutFromContext, checkSavedTokenForContext }}
    <LoginContext.Provider value={{ userObject, isLoggedIn, callLoginFromContext: setUserAsLoggedIn, callLogoutFromContext: setLoggedOutState, checkSavedTokenForContext: loadSavedLocalToken }}>
      {/*'children' represents any components nested inside the LoginProvider
      indicating that these child components will have access to the context values provided by the LoginContext.Provider*/}
      {children}
    </LoginContext.Provider>
  );
};
