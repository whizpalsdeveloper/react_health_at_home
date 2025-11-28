import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./RouteLoader.css";

const MIN_VISIBLE_MS = 900;

/**
 * Displays the branded loading card every time the route changes.
 * Helps smooth out screen transitions on TV hardware where refreshes are noticeable.
 */
export default function RouteLoader() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timeout = window.setTimeout(() => setIsVisible(false), MIN_VISIBLE_MS);
    return () => window.clearTimeout(timeout);
  }, [location.key]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="route-loader-overlay" role="status" aria-live="polite">
      <img
        src="/images/loading.png"
        alt="Loading indicator"
        className="route-loader-image"
        draggable={false}
      />
    </div>
  );
}

