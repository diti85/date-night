import React, { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import AuthContext from '../AuthProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? <Component {...props} /> : <Navigate to="/" />
      }
    />
  );
};

export default ProtectedRoute;
