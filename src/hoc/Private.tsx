import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/hooks";
import type { PrivateType } from "../types";

const Private = ({ children }: PrivateType) => {
  const { token } = useAppSelector((state) => state.userSlice.user);

  if (!token) return <Navigate to="/SignIn" />;
  return children;
};

export default Private;
