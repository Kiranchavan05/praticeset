import React, { useState } from "react";
const AuthContext = React.createContext({
  token: "",
  userEmail:"",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  // token:localStorage.getItem('token'),
  // email:localStorage.getItem('email')
});

export const AuthContextProvider = (props) => {


  const initialEmail=localStorage.getItem('email')
  const [userEmail,SetUserEmail]=useState(initialEmail);
  
  const initialToken=localStorage.getItem('token')
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  

  const loginHandler = (token) => {
    setToken(token);
    SetUserEmail(userEmail)
    localStorage.setItem('token', token);
    localStorage.setItem('email', userEmail)
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token')
    localStorage.removeItem('email')
  };

  const contextValue = {
    token: token,
    userEmail: userEmail,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;