import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./CategoryDetail.css";

export default function CategoryDetail() {
	const navigate = useNavigate();
	const location = useLocation();
	const { categoryId } = useParams();
	const [focusIndex, setFocusIndex] = useState(0);
	// 0: Back, 1..N: Intensity Buttons, N+1..M: Video Cards

	const [selectedSubcategoryIndex, setSelectedSubcategoryIndex] = useState(0);
	const gridRef = useRef(null);

	const categoryData = location.state?.category;

	useEffect(() => {
		if (!categoryData) {
			navigate("/movement-categories");
		}
	}, [categoryData, navigate]);

	// Auto-scroll focused item into view
	useEffect(() => {
		const focusedElement = document.querySelector(".focused");
		if (focusedElement) {
			focusedElement.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start"
			});
		}
	}, [focusIndex]);

	if (!categoryData) {
		return null;
	}

	const selectedSubcategory = categoryData.subcategories[selectedSubcategoryIndex];
	const subLen = categoryData.subcategories.length;
	const videos = selectedSubcategory?.videos || [];
	const vidLen = videos.length;

	const formatDuration = (seconds) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins} mins${secs > 0 ? ` ${secs} secs` : ''}`;
	};

	useTVNavigation({
		onLeft: () => {
			if (focusIndex > subLen) {
				// Video Grid
				const videoIdx = focusIndex - subLen - 1;
				if (videoIdx % 3 === 0) {
					// Left edge of grid -> Go to selected subcategory button
					setFocusIndex(Math.min(subLen, selectedSubcategoryIndex + 1));
				} else {
					setFocusIndex(focusIndex - 1);
				}
			} else if (focusIndex > 1) {
				// Sidebar -> Go up/back not allowed here, use UP for that.
				// But we can go back to Back button if they desperately want?
				// Standard behavior: Left from Sidebar usually does nothing or goes to parent.
				// Let's keep it safe:
				setFocusIndex(0);
			} else {
				// From first sidebar item or Back -> Stay or go Back
				setFocusIndex(0);
			}
		},
		onRight: () => {
			if (focusIndex === 0) {
				// Back -> Grid first item or Sidebar first item?
				// Usually Back -> Content.
				if (vidLen > 0) setFocusIndex(subLen + 1);
				else setFocusIndex(1);
			} else if (focusIndex <= subLen) {
				// Sidebar -> Grid
				if (vidLen > 0) {
					setFocusIndex(subLen + 1);
				}
			} else if (focusIndex < subLen + vidLen) {
				// Grid -> Right
				const videoIdx = focusIndex - subLen - 1;
				if (videoIdx % 3 !== 2) {
					setFocusIndex(focusIndex + 1);
				}
			}
		},
		onUp: () => {
			if (focusIndex > subLen + 3) {
				// Grid -> Up a row
				setFocusIndex(focusIndex - 3);
			} else if (focusIndex > subLen) {
				// Grid Top Row -> Back Button
				setFocusIndex(0);
			} else if (focusIndex > 1) {
				// Sidebar -> Up
				setFocusIndex(focusIndex - 1);
			} else if (focusIndex === 1) {
				// Sidebar Top -> Back Button
				setFocusIndex(0);
			}
		},
		onDown: () => {
			if (focusIndex === 0) {
				// Back -> First Sidebar Item
				setFocusIndex(1);
			} else if (focusIndex < subLen) {
				// Sidebar -> Down
				setFocusIndex(focusIndex + 1);
			} else if (focusIndex > subLen) {
				// Grid -> Down a row
				if (focusIndex + 3 <= subLen + vidLen) {
					setFocusIndex(focusIndex + 3);
				} else {
					// Check if we can go to a partial last row?
					// If strict grid, we stop.
					// If we want to jump to last item? No, sticky is better.
				}
			}
		},
		onEnter: () => {
			if (focusIndex === 0) {
				navigate("/movement-categories");
			} else if (focusIndex <= subLen) {
				const newIdx = focusIndex - 1;
				setSelectedSubcategoryIndex(newIdx);
			} else {
				const videoIndex = focusIndex - subLen - 1;
				navigate("/video-player", { state: { videos: videos, startIndex: videoIndex } });
			}
		},
		onBack: () => navigate("/movement-categories"),
	});

	return (
		<div id="detail-content">
			<div id="detail-bg" />
			<div id="detail-header-logo-left" title="Health at Home" />
			<div id="detail-section-title">
				Movement Routines: {categoryData.name}
			</div>

			<div className="detail-main-container">
				<div className="detail-sidebar">
					<div
						className={`detail-back-btn ${focusIndex === 0 ? "focused" : ""}`}
						onClick={() => navigate("/movement-categories")}
						onMouseEnter={() => setFocusIndex(0)}
					/>

					<div className="detail-intensity-section">
						<div className="detail-intensity-header">
							<span>Choose</span>
							<span>your intensity</span>
						</div>

						{categoryData.subcategories.map((subcategory, index) => (
							<div
								key={index}
								className={`detail-intensity-btn ${focusIndex === index + 1 ? "focused" : ""
									} ${selectedSubcategoryIndex === index ? "selected" : ""}`}
								onClick={() => {
									setSelectedSubcategoryIndex(index);
									setFocusIndex(index + 1);
								}}
								onMouseEnter={() => setFocusIndex(index + 1)}
							>
								{subcategory.title}
							</div>
						))}
					</div>
				</div>

				<div className="detail-content-area">
					<div className="detail-info-container">
						<h2>{selectedSubcategory.title}</h2>
						<p>{selectedSubcategory.description}</p>
					</div>

					<div className="detail-videos-grid" ref={gridRef}>
						{videos.map((video, index) => (
							<div
								key={index}
								className={`detail-video-card ${focusIndex === index + subLen + 1 ? "focused" : ""}`}
								onClick={() => {
									navigate("/video-player", { state: { videos: videos, startIndex: index } });
								}}
								onMouseEnter={() => setFocusIndex(index + subLen + 1)}
							>
								<div className="detail-video-thumbnail">
									<img src={video.thumbnail} alt={video.video_title} />
								</div>
								<div className="detail-video-info">
									<h3>{video.video_title}</h3>
									<p className="detail-video-duration">
										{formatDuration(video.duration)}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
