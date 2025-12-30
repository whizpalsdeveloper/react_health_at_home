import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./PrescriptionsWelcome.css";

export default function PrescriptionsWelcome() {
    const navigate = useNavigate();
    const [focusIndex, setFocusIndex] = useState(1); // 0: Back, 1: Agree & Continue

    useTVNavigation({
        onLeft: () => setFocusIndex(0),
        onRight: () => setFocusIndex(1),
        onEnter: () => {
            if (focusIndex === 0) {
                navigate("/");
            } else {
                navigate("/prescriptions");
            }
        },
        onBack: () => navigate("/"),
    });

    return (
        <div id="prescriptions-welcome-container">
            {/* Background Fade */}
            <div id="prescriptions-bg" />

            {/* Top Header Logos */}
            <div id="drnow-logo-small" />
            <div id="drnow-logo-prescriptions" />

            {/* Page Title Section */}
            <div id="prescriptions-logo" />
            <div id="prescriptions-title">Order Prescriptions</div>

            {/* Main Content Area */}
            <div className="welcome-content">
                <h1>Welcome</h1>
                <p>
                    Comcast is providing you with a connection to a third-party pharmaceutical provider in a HIPAA-compliant, SOC 2 secure setting (to ensure the privacy and protection of your personal data), through the Health At Home (HAH) application. To be clear, neither Comcast nor Dr. NOW Prescriptions is providing you with any healthcare, prescription, or other professional advice. By affirmatively selecting the button below, you acknowledge and voluntarily accept the inherent risks associated with receiving those services. Further, you expressly agree to hold Comcast and Dr. NOW harmless and waive any liability regarding your healthcare, pharmaceutical, and professional treatment when using the Dr. NOW app and fully understand you are leaving Comcast's programming.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="welcome-actions">
                <div
                    className={`welcome-btn back ${focusIndex === 0 ? "focused" : ""}`}
                    onMouseEnter={() => setFocusIndex(0)}
                    onClick={() => navigate("/")}
                />
                <div
                    className={`welcome-btn agree ${focusIndex === 1 ? "focused" : ""}`}
                    onMouseEnter={() => setFocusIndex(1)}
                    onClick={() => navigate("/prescriptions")}
                />
            </div>
        </div>
    );
}
