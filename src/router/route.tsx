import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../components/ui/ErrorPage/ErrorPage";
import NotFound from "../components/ui/NotFound/NotFound";
import Home from "../pages/Home/Home";
import Login from "../components/ui/Login/Login";
import Register from "../components/ui/Register/Register";
import ProfilePage from "../components/ui/ProfilePage/ProfilePage";
import TokenBasePrivateRoute from "./PrivateRoute/TokenBasePrivateRoute";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TokenBasePrivateRoute><Home /></TokenBasePrivateRoute> ,
      },
      {
        path: "/login",
        element: <Login />,
      }, 
      {
        path: "/register",
        element: <Register/>,
      }, 
      {
        path: "/profile",
        element: <TokenBasePrivateRoute><ProfilePage/></TokenBasePrivateRoute>  ,
      }, 
    ],
  },
  
  { path: "*", element: <NotFound /> },
]);

export default router;
