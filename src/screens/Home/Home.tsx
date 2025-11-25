import "./Home.css";
import Header from "../../components/Header/Header";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";

export default function Home() {

        const navigate = useNavigate();
        const [focusIndex, setFocusIndex] = useState<number>(0); // 0: left (movement), 1: right (prescriptions)
      
        // Ensure first focus is set for keyboard users
        useEffect(() => {
          // no-op; focusIndex is default 0
        }, []);
      
        useTVNavigation({
          onLeft: () => setFocusIndex((i) => Math.max(0, i - 1)),
          onRight: () => setFocusIndex((i) => Math.min(1, i + 1)),
          onEnter: () => {
            if (focusIndex === 0) {
              navigate("/terms", { state: { feature: "movement" } });
            } else if (focusIndex === 1) {
              navigate("/prescriptions", { state: { feature: "prescriptions" } });
            }
          },
        });
      
        return (
          <div id="main-content">
            {/* background fade/header */}
            <div id="main-bg" />
            <div id="main-images" />
      
            <Header />
      
            {/* big cards */}
            <div id="feature1-btn" className={`selectable ${focusIndex === 0 ? "focused" : ""}`} tabIndex={0}
              onMouseEnter={() => setFocusIndex(0)}
              onClick={() => navigate("/terms", { state: { feature: "movement" } })}
            >
              <img
                src={focusIndex === 0 ? "/images/move_on.png" : "/images/move_off.png"}
                alt="Movement Routines"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
      
            <div id="feature2-btn" className={`selectable ${focusIndex === 1 ? "focused" : ""}`} tabIndex={0}
              onMouseEnter={() => setFocusIndex(1)}
              onClick={() => navigate("/prescriptions", { state: { feature: "prescriptions" } })}
            >
              <img
                src={focusIndex === 1 ? "/images/order_on.png" : "/images/order_off.png"}
                alt="Order Prescriptions"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
      
            {/* main-row-cursor that mimics highlight position from your old code */}
            <div id="main-row-cursor" className={focusIndex === 0 ? "feature1" : "feature2"} />
      
            {/* Additional elements kept for compatibility with original CSS/IDs */}
            <div id="movement-title" />
            <div id="movement-cta" />
            <div id="category-hero" />
            <div id="focus-item" />
          </div>
        );
      }