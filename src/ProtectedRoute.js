import React, { useEffect } from "react";
import { Redirect, useHistory, Route } from "react-router-dom";
import { useAuth } from "./Providers/AuthProvider";

function ProtectedRoute({ component: Component, ...rest }) {
  const { token } = useAuth();
  const history = useHistory();
  const isAuthenticated = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      history.push("/");
    } else {
      history.push("/dashboard");
    }
  }, [token]);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}

export default ProtectedRoute;
