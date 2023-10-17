import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
const ProtectedRoutes = () => {
  // const trainer = useSelector(({ userTrainer }: RootState) => userTrainer);
  <Outlet />;
  // if (trainer) {
  //   return <Outlet />;
  // } else {
  //   return <Navigate to="/" />;
  // }
};

export default ProtectedRoutes;
