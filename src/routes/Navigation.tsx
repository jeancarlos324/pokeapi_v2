import { Navigate, Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex";
import Details from "./details/Details";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { getServices } from "../store/slice/thunks/getServices.thunk";
import NotFoundPage from "./404/NotFoundPage";

const Navigation = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pokedex" replace />} />
      <Route path="/pokedex" element={<Pokedex />}>
        <Route path=":name" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Navigation;
