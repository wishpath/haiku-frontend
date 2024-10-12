// src/context/LoginContext.js
import React, { createContext, useContext, useState } from 'react';

//creates context Object. This object has two components: Provider and Consumer
//Provider provides way to share State
//Consumer allows components to subscribe to context changes
//does not hold the values itself, the actual state and values are stored within the LoginProvider
const LoginContext = createContext();

//defines a custom hook that allows components to access the LoginContext values easily
//somehow through useLogin a function 'login' (within LoginPorvider) is accessed like: "const { login } = useLogin();"
//how? magic. `useContext()` uses Ract magic to access `LoginProvider`.
export const useLogin = () => useContext(LoginContext);


//children - refers to the child components that are nested inside the LoginProvider component
export const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  return (
    //formulates LoginProvider as Component like: <LoginProvider> under only it,  the context will be available in the App.js
    //listing username, isLoggedIn, login, logout that will be available by useLogin hook
    //value prop of the LoginContext.Provider is the one that actually stores username, isLoggedIn, login, logout
    <LoginContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {/*represents any components nested inside the LoginProvider
      indicating that these child components will have access to the context values provided by the LoginContext.Provider*/}
      {children}
    </LoginContext.Provider>
  );
};
