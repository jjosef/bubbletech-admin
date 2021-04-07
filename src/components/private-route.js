import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../services/auth';

export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      element={auth.user ? children : <Navigate to="/" replace />}
    />
  );
}