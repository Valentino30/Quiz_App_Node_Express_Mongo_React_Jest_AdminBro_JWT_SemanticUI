import React, { createContext, useReducer } from "react";
import { decode } from "jsonwebtoken";

const initialState = {
  user: null,
};

// Set user equal to token if token exists in localStorage
if (localStorage.getItem("token")) {
  const decodedToken = decode(localStorage.getItem("token"));
  decodedToken.exp * 1000 < Date.now()
    ? localStorage.removeItem("token")
    : (initialState.user = decodedToken);
}

const AuthContext = createContext({
  user: null,
  login: (user) => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    localStorage.setItem("token", user.token);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    ></AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
