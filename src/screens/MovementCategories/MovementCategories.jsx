import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import { movementApi } from "../../services/movementApi";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./MovementCategories.css";
import movementCategoriesData from "../../../static/movement_categories.json";

export default function MovementCategories() {
	const navigate = useNavigate();
	const [focusIndex, setFocusIndex] = useState(0);
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isVideoPlaying, setIsVideoPlaying] = useState(false);

	useEffect(() => {
		loadCategories();
	}, []);

	const loadCategories = () => {
		setLoading(true);
		try {
			if (Array.isArray(movementCategoriesData)) {
				console.log("movementCategoriesData", movementCategoriesData);
				setCategories(movementCategoriesData);
				setSelectedCategory(movementCategoriesData[0]);
			} else {
				console.error('Data is not an array');
			}
		} catch (error) {
			console.error('Error loading categories:', error);
		} finally {
			setLoading(false);
		}
	};

	const totalItems = categories.length + 1;

	useEffect(() => {
		if (focusIndex > 0 && categories.length > 0) {
			const categoryIndex = focusIndex - 1;
			if (categories[categoryIndex]) {
				setSelectedCategory(categories[categoryIndex]);
			}
		}
	}, [focusIndex, categories]);

	useTVNavigation({
		onLeft: () => {
			if (focusIndex > 0) {
				setFocusIndex(focusIndex - 1);
			}
		},
		onRight: () => {
			if (focusIndex < totalItems - 1) {
				setFocusIndex(focusIndex + 1);
			}
		},
		onUp: () => {
			if (focusIndex > 0) {
				setFocusIndex(0);
			}
		},
		onDown: () => {
			if (focusIndex === 0 && categories.length > 0) {
				setFocusIndex(1);
			}
		},
		onEnter: () => {
			if (focusIndex === 0) {
				navigate("/movement-welcome");
			} else {
				const selectedCategory = categories[focusIndex - 1];
				console.log("Selected category:", selectedCategory);
			}
		},
		onBack: () => navigate("/movement-welcome"),
	});

	return (
		<div id="categories-content">
			<div id="categories-bg" />

			<div id="categories-header-logo-left" title="Health at Home" />
			<div id="categories-header-logo-right" title="FunAndMoving.com" />

			<div id="categories-section-title">Movement Routines</div>

			<div className="categories-main-container">

				<div className="categories-description">
					{loading ? (
						<LoadingSpinner message="Loading movement categories..." />
					) : selectedCategory ? (
						<div className="categories-info-container custom-border">
							<h2>{selectedCategory.name}</h2>
							<p>{selectedCategory.description}</p>
						</div>
					) : (
						<div>No categories available</div>
					)}

					<div
						className={`categories-back-btn ${focusIndex === 0 ? "focused" : ""}`}
						onClick={() => navigate("/movement-welcome")}
						onMouseEnter={() => setFocusIndex(0)}
					>
					</div>
				</div>

				<div className="categories-video-area">
					{selectedCategory && (
						<img
							src={selectedCategory.hero}
							alt={selectedCategory.name}
							className="categories-main-image"
						/>
					)}
				</div>

				<div className="categories-button-row">
					{categories.map((category, index) => (
						<div
							key={category.id}
							className={`category-btn ${focusIndex === index + 1 ? "focused" : ""}`}
							onClick={() => {
								setFocusIndex(index + 1);
							}}
							onMouseEnter={() => setFocusIndex(index + 1)}
						>
							{category.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}