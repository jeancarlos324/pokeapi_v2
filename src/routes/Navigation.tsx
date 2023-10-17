import { Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex";
import Details from "./details/Details";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/pokedex" element={<Pokedex />}>
        <Route path=":name" element={<Details/>} />
      </Route>
    </Routes>
  );
};

export default Navigation;
