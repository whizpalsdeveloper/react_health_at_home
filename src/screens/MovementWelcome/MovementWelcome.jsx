import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./MovementWelcome.css";

export default function MovementWelcome() {
  const navigate = useNavigate();
  const [focusIndex, setFocusIndex] = useState(1);

  useTVNavigation({
    onLeft: () => setFocusIndex(0),
    onRight: () => setFocusIndex(1),
    onEnter: () => {
      if (focusIndex === 0) {
        navigate("/");
      } else {
        navigate("/movement-categories");
      }
    },
    onBack: () => navigate("/"),
  });

  return (
    <div id="welcome-content">
      <div id="welcome-bg" />

      <div id="welcome-header-logo-left" title="Health at Home" />
      <div id="welcome-header-logo-right" title="Dr. Now Prescriptions" />

      <div id="welcome-section-icon" />
      <div id="welcome-section-title">Movement Routines</div>

      <div className="welcome-main-container">
        <h1 className="welcome-title">Welcome</h1>
        
        <p className="welcome-subtitle">Before we begin, please read this VERY IMPORTANT passage:</p>

        <p className="welcome-text">
          By participating in FunAndMoving.com (The FAM) and any of its related apps, you acknowledge that you have been advised by this notice that you should obtain and have completed a physical examination and received medical approval <strong>PRIOR</strong> to commencing a movement and exercise program or engaging in <strong>ANY</strong> strenuous activity or activity out of your <strong>SUBJECTIVE</strong> normal activities performed, to include FAM. I fully acknowledge and understand that I release FAM and its designated staff and trainers of any and all liability; and that I am waiving any right I or my successors may have to assert a claim or bring any legal action against FAM.
        </p>

        <p className="welcome-text-secondary">
          My physician has given me permission to do all of the movements and exercises contained herein. I also understand that my assent and date thereof will be recorded by FunAndMoving.com.
        </p>

        <div className="welcome-button-row">
          <div
            className={`welcome-btn back ${focusIndex === 0 ? "focused" : ""}`}
            onClick={() => navigate("/")}
            onMouseEnter={() => setFocusIndex(0)}
          />
          <div
            className={`welcome-btn agree ${focusIndex === 1 ? "focused" : ""}`}
            onClick={() => navigate("/movement-categories")}
            onMouseEnter={() => setFocusIndex(1)}
          />
        </div>
      </div>
    </div>
  );
}

