import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Stats from "./Components/Stats";

function Routers() {
  return (
    <Switch>
      <ProtectedRoute path="/" exact>
        <Login />
      </ProtectedRoute>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/forgotpassword">
        <ForgotPassword />
      </Route>
      <Route path="/resetpassword">
        <ResetPassword />
      </Route>
      <ProtectedRoute path="/dashboard" component={Dashboard}></ProtectedRoute>
      <ProtectedRoute path="/stats" component={Stats}></ProtectedRoute>

      <ProtectedRoute path="*" exact>
        <Login />
      </ProtectedRoute>
    </Switch>
  );
}

export default Routers;
