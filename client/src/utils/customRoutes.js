import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};

export const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <Route
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    ></Route>
  );
};
