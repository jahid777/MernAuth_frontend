import { Redirect, Route } from "react-router-dom";

const PrivateRouteLogin = ({ children, ...rest }) => {
  const loginData = JSON.parse(sessionStorage.getItem("data"));

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginData ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouteLogin;
