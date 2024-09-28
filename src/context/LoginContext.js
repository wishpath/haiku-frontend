// src/context/LoginContext.js
import React, { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

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
    <LoginContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
