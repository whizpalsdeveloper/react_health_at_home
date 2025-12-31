import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import MovementWelcome from "./screens/MovementWelcome/MovementWelcome";
import MovementCategories from "./screens/MovementCategories/MovementCategories";
import CategoryDetail from "./screens/CategoryDetail/CategoryDetail";
import Prescriptions from "./screens/Prescriptions/Prescriptions";
import PrescriptionsWelcome from "./screens/PrescriptionsWelcome/PrescriptionsWelcome";
import VideoPlayer from "./screens/VideoPlayer/VideoPlayer";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movement-welcome" element={<MovementWelcome />} />
      <Route path="/movement-categories" element={<MovementCategories />} />
      <Route path="/category/:categoryId" element={<CategoryDetail />} />
      <Route path="/prescriptions" element={<Prescriptions />} />
      <Route path="/prescriptions-welcome" element={<PrescriptionsWelcome />} />
      <Route path="/video-player" element={<VideoPlayer />} />

    </Routes>
  );
}

export default App;
