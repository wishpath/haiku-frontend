// src/context/LoginContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    if (savedUser && savedToken) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser && parsedUser.exp > Math.floor(Date.now() / 1000)) { //!! create my own JWT validator!!!
        console.log("logged in (from local storage)");
        setUserObject(parsedUser);
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  const callLoginFromContext = (userObject) => {
    console.log("logged in (callLoginFromContext)");
    setUserObject(userObject);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userObject));
    localStorage.setItem('token', userObject.token);  // token	undefined !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };

  const callLogoutFromContext = () => {
    console.log("logged out");
    setUserObject('');
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    //formulates LoginProvider as Component like: <LoginProvider> under only it,  the context will be available in the App.js
    //listing username, isLoggedIn, login, logout that will be available by useLogin hook
    //value prop of the LoginContext.Provider is the one that actually stores username, isLoggedIn, login, logout
    <LoginContext.Provider value={{ userObject, isLoggedIn, callLoginFromContext, callLogoutFromContext }}>
      {/*represents any components nested inside the LoginProvider
      indicating that these child components will have access to the context values provided by the LoginContext.Provider*/}
      {children}
    </LoginContext.Provider>
  );
};
