import { useAuthorize } from "@hooks/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: Props) => {
  const isAuthorized = useAuthorize();

  return isAuthorized ? children : <Navigate to="/user/login" />;
};
