import React from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import "./App.scss";
import "semantic-ui-css/semantic.min.css";

import Auth from "./pages/Auth";
import Quiz from "./pages/Quiz";
import NavBar from "./components/NavBar";
import { ProtectedRoute, AuthRoute } from "./utils/customRoutes";

function App() {
  return (
    <Router>
      <NavBar test-class="navbar" />
      <Container className="app" test-class="container">
        <Switch test-class="switch">
          <ProtectedRoute
            exact
            path="/"
            component={Quiz}
            test-class="quiz-route"
          />
          <AuthRoute
            exact
            path="/register"
            component={Auth}
            test-class="register-route"
          />
          <AuthRoute
            exact
            path="/login"
            component={Auth}
            test-class="login-route"
          />
          <Redirect to="/" test-class="redirect-route" />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
