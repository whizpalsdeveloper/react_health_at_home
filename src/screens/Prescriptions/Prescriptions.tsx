import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./Prescriptions.css";

export default function Prescriptions() {
  const navigate = useNavigate();
  const [focused, setFocused] = useState<boolean>(true); // Only one button (Back)

  useTVNavigation({
    onEnter: () => navigate("/"),          // Enter → go back
    onBack: () => navigate("/"),           // Back → go back
    onLeft: () => setFocused(true),
    onRight: () => setFocused(true),
    onUp: () => setFocused(true),
    onDown: () => setFocused(true),
  });

  return (
    <div id="main-content">
      {/* Background fade */}
      <div id="prescriptions-bg" />

      {/* Small DRNOW logo (top left) */}
      <div id="drnow-logo-small" />

      {/* Large DRNOW logo (top right) */}
      <div id="drnow-logo-prescriptions" />

      {/* Red icon logo */}
      <div id="prescriptions-logo" />

      {/* Back button */}
      <div
        id="prescriptions-back-btn"
        className={focused ? "active" : ""}
        tabIndex={0}
        onMouseEnter={() => setFocused(true)}
        onClick={() => navigate("/")}
      />

      {/* Title */}
      <div id="prescriptions-title">Order Prescriptions</div>

      {/* QR Code */}
      <div id="prescriptions-qrcode" />

      {/* Optional banners from original UI */}
      <div id="prescriptions-banner-horizontal" />
      <div id="prescriptions-banner-vertical" />
    </div>
  );
}
