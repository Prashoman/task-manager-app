import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { currentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const TokenBasePrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(currentToken);
  // console.log("Token ROute", token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default TokenBasePrivateRoute;
