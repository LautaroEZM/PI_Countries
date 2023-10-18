import { Route, Routes } from "react-router-dom";
import "./App.css";
import Country from "./pages/Country";
import Home from "./pages/Home";
import List from "./pages/List";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <div className="contentContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/country" element={<Country />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
