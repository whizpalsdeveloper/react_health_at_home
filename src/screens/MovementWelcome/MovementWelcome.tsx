import "./MovementWelcome.css";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

export default function MovementWelcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <Header />

      <h2 className="movement-title">Movement Routines</h2>

      <h1 className="welcome-title">Welcome</h1>

      <p className="welcome-text">
        Before we begin, please read this VERY IMPORTANT passage:<br /><br />
        By participating in FunAndMoving.com (The FAM) and any of its related apps,
        you acknowledge that you have been advised that you should obtain a physical
        examination and receive medical approval PRIOR to commencing any exercise or
        activity.
      </p>

      <div className="button-row">
        <button onClick={() => navigate("/")}>Back</button>
        <button>Agree & Continue</button>
      </div>
    </div>
  );
}
