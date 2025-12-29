import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./MovementWelcome.css";

export default function MovementWelcome() {
  const navigate = useNavigate();
  const [focusIndex, setFocusIndex] = useState(1); // Default focus on Agree (index 1)

  useTVNavigation({
    onLeft: () => setFocusIndex(0),
    onRight: () => setFocusIndex(1),
    onEnter: () => {
      if (focusIndex === 0) {
        navigate("/");
      } else {
        // Continue flow logic here
        console.log("Agree & Continue");
      }
    },
    onBack: () => navigate("/"),
  });

  return (
    <div id="welcome-content">
      {/* Top Fade Background */}
      <div id="welcome-bg" />

      {/* Header Logos */}
      <div id="welcome-header-logo-left" title="Health at Home" />
      <div id="welcome-header-logo-right" title="Dr. Now Prescriptions" />

      {/* Section Indicator */}
      <div id="welcome-section-icon" />
      <div id="welcome-section-title">Movement Routines</div>

      {/* Main Container */}
      <div className="welcome-main-container">
        <h1 className="welcome-title">Welcome</h1>

        <p className="welcome-text">
          Comcast is providing you with a connection to a third-party pharmaceutical provider in a HIPAA-compliant, SOC 2 secure setting (to ensure the privacy and protection of your personal data), through the Health At Home (HAH) application. To be clear, neither Comcast nor Dr. NOW Prescriptions is providing you with any healthcare, prescription, or other professional advice. By affirmatively selecting the button below, you acknowledge and voluntarily accept the inherent risks associated with receiving those services. Further, you expressly agree to hold Comcast and Dr. NOW harmless and waive any liability regarding your healthcare, pharmaceutical, and professional treatment when using the Dr. NOW app and fully understand you are leaving Comcast's programming.
        </p>

        <div className="welcome-button-row">
          <div
            className={`welcome-btn back ${focusIndex === 0 ? "focused" : ""}`}
            onClick={() => navigate("/")}
            onMouseEnter={() => setFocusIndex(0)}
          />
          <div
            className={`welcome-btn agree ${focusIndex === 1 ? "focused" : ""}`}
            onClick={() => console.log("Agree clicked")}
            onMouseEnter={() => setFocusIndex(1)}
          />
        </div>
      </div>
    </div>
  );
}

