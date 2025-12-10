// File: src/tv/useTVNavigation.js
import { useEffect } from "react";

/* Minimal TV key mapping hook. Use to register handlers for remote keys. */
export function useTVNavigation(handlers) {
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          handlers.onUp?.();
          e.preventDefault();
          break;
        case "ArrowDown":
          handlers.onDown?.();
          e.preventDefault();
          break;
        case "ArrowLeft":
          handlers.onLeft?.();
          e.preventDefault();
          break;
        case "ArrowRight":
          handlers.onRight?.();
          e.preventDefault();
          break;
        case "Enter":
        case "OK":
          handlers.onEnter?.();
          e.preventDefault();
          break;
        case "Backspace":
        case "Escape":
        case "Back":
          handlers.onBack?.();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handlers]);
}
