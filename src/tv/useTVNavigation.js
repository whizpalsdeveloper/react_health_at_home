import { useEffect } from "react";

export function useTVNavigation(handlers = {}) {
  useEffect(() => {
    const onKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
          handlers.onUp && handlers.onUp();
          e.preventDefault();
          break;

        case "ArrowDown":
          handlers.onDown && handlers.onDown();
          e.preventDefault();
          break;

        case "ArrowLeft":
          handlers.onLeft && handlers.onLeft();
          e.preventDefault();
          break;

        case "ArrowRight":
          handlers.onRight && handlers.onRight();
          e.preventDefault();
          break;

        case "Enter":
        case "OK":
          handlers.onEnter && handlers.onEnter();
          e.preventDefault();
          break;

        case "Backspace":
        case "Escape":
          handlers.onBack && handlers.onBack();
          e.preventDefault();
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [handlers]);
}

// // File: src/tv/useTVNavigation.ts
// import { useEffect } from "react";

// export interface TVNavHandlers {
//   onUp?: () => void;
//   onDown?: () => void;
//   onLeft?: () => void;
//   onRight?: () => void;
//   onEnter?: () => void;
//   onBack?: () => void;
// }

// /* Minimal TV key mapping hook. Use to register handlers for remote keys. */
// export function useTVNavigation(handlers: TVNavHandlers) {
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       switch (e.key) {
//         case "ArrowUp":
//           handlers.onUp?.();
//           e.preventDefault();
//           break;
//         case "ArrowDown":
//           handlers.onDown?.();
//           e.preventDefault();
//           break;
//         case "ArrowLeft":
//           handlers.onLeft?.();
//           e.preventDefault();
//           break;
//         case "ArrowRight":
//           handlers.onRight?.();
//           e.preventDefault();
//           break;
//         case "Enter":
//         case "OK":
//           handlers.onEnter?.();
//           e.preventDefault();
//           break;
//         case "Backspace":
//         case "Escape":
//         case "Back":
//           handlers.onBack?.();
//           e.preventDefault();
//           break;
//       }
//     };

//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [handlers]);
// }
