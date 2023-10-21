import { Outlet } from "react-router-dom";
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
