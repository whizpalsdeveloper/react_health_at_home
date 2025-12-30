import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import MovementWelcome from "./screens/MovementWelcome/MovementWelcome";
import MovementCategories from "./screens/MovementCategories/MovementCategories";
import Prescriptions from "./screens/Prescriptions/Prescriptions";
import PrescriptionsWelcome from "./screens/PrescriptionsWelcome/PrescriptionsWelcome";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movement-welcome" element={<MovementWelcome />} />
      <Route path="/movement-categories" element={<MovementCategories />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/prescriptions-welcome" element={<PrescriptionsWelcome />} />

    </Routes>
  );
}

export default App;
