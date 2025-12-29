// File: src/tv/useTVNavigation.js
import { useEffect, useRef } from "react";

/* Minimal TV key mapping hook. Use to register handlers for remote keys. */
export function useTVNavigation(handlers) {
	const handlersRef = useRef(handlers);

	// Update ref when handlers change
	useEffect(() => {
		handlersRef.current = handlers;
	}, [handlers]);

	useEffect(() => {
		const onKey = (e) => {
			const currentHandlers = handlersRef.current;
			switch (e.key) {
				case "ArrowUp":
					currentHandlers.onUp?.();
					e.preventDefault();
					break;
				case "ArrowDown":
					currentHandlers.onDown?.();
					e.preventDefault();
					break;
				case "ArrowLeft":
					currentHandlers.onLeft?.();
					e.preventDefault();
					break;
				case "ArrowRight":
					currentHandlers.onRight?.();
					e.preventDefault();
					break;
				case "Enter":
				case "OK":
					currentHandlers.onEnter?.();
					e.preventDefault();
					break;
				case "Backspace":
				case "s":
				case "Back":
					currentHandlers.onBack?.();
					e.preventDefault();
					break;
			}
		};

		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []); // Empty dependency array - only set up once
}
