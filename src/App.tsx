import "./App.css";
import { HashRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import HeaderPage from "./components/header";

function App() {
  return (
    <HashRouter>
      <div className="App pokedex overflow-hidden">
        <HeaderPage />
        <Navigation />
      </div>
    </HashRouter>
  );
}

export default App;
