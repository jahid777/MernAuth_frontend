import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import FrontPage from "./Components/Home/New/FrontPage";
import NewLogin from "./Components/Home/New/NewLogin";
import NewSignup from "./Components/Home/New/NewSignup";
import ForgotPassword from "./Components/Home/New/ForgotPassword";
import PrivateRouteLogin from "./Components/Authentication/PrivateRouteLogin/PrivateRouteLogin";
import ResetPassword from "./Components/Home/New/ResetPassword";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FrontPage />
        </Route>
        <Route path="/login">
          <NewLogin />
        </Route>
        <Route path="/signUp">
          <NewSignup />
        </Route>

        <PrivateRouteLogin path="/home">
          <Home />
        </PrivateRouteLogin>

        <Route path="/forgotPassword">
          <ForgotPassword />
        </Route>

        <Route path="/reset_password">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
