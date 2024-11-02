
import { Navigate } from 'react-router-dom';

export function ProtectedRoutes({children}) {
    const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  return (isLogin ? children : <Navigate to="/" />);
}
