import "./App.css";
import { HashRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
// import { PokemonInfo } from "./routes/PokemonInfo";
// import LoadingScreen from "./components/LoadingScreen";
// import { useSelector } from "react-redux";

function App() {
  // const isActiveScreen = useSelector((state) => state.setLoadingScreen);
  return (
    <HashRouter>
      <div className="App pokedex">
        <Navigation />
        {/* {isActiveScreen && <LoadingScreen />} */}
        {/* <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:id" element={<PokemonInfo />} />
          </Route>
        </Routes> */}
      </div>
    </HashRouter>
  );
}

export default App;
