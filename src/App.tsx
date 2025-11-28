import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import MovementWelcome from "./screens/MovementWelcome/MovementWelcome";
import Prescriptions from "./screens/Prescriptions/Prescriptions";
import RouteLoader from "./components/Loader/RouteLoader";

function App() {
  return (
    <>
      <RouteLoader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movement-welcome" element={<MovementWelcome />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
      </Routes>
    </>
  );
}

export default App;
