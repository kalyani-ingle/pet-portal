import { Navigate, Outlet } from "react-router-dom";
// import Cookies from 'js-cookie';

const checkJWTToken = () => {
  // Get all cookies
  const cookieString = document.cookie;

  // Split cookies into an array
  const cookiesArray = cookieString.split('; ');

  // Reduce array to an object
  const cookies = cookiesArray.reduce((acc, cookie) => {
    const [name, value] = cookie.split('=');
    acc[name] = value;
    return acc;
  }, {});

  // Extract the token
  const token = cookies['token'];
  return !!token; // Return true if token exists, false otherwise
};



const ProtectedRoute = () => {
  const isAuthenticated = checkJWTToken();
  return isAuthenticated? <Outlet /> : <Navigate to="/login" replace />;
};


export default ProtectedRoute;