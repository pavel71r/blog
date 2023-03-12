import { Navigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";
import { path } from "../path/path";

type PrivateType = {
  children: JSX.Element;
};

const Private = ({ children }: PrivateType) => {
  const { token } = useAppSelector((state) => state.userSlice.user);

  if (!token) return <Navigate to={path.singIn} />;
  return children;
};

export default Private;
