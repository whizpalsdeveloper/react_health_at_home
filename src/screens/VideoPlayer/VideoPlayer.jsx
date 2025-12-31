import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTVNavigation } from "../../tv/useTVNavigation";
import "./VideoPlayer.css";

export default function VideoPlayer() {
    const navigate = useNavigate();
    const location = useLocation();
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [focusIndex, setFocusIndex] = useState(1); // 0: Back, 1: Play/Pause, 2: Fast Forward, 3: Rewind, 4: Timeline
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const controlsTimeoutRef = useRef(null);

    const { videos, startIndex } = location.state || {};

    const [currentVideoIndex, setCurrentVideoIndex] = useState(startIndex || 0);
    const videoData = videos ? videos[currentVideoIndex] : null;

    useEffect(() => {
        if (!videoData) {
            navigate(-1);
        }
    }, [videoData, navigate]);

    useEffect(() => {
        resetControlsTimeout();
        return () => clearTimeout(controlsTimeoutRef.current);
    }, []);

    const resetControlsTimeout = () => {
        setShowControls(true);
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 5000);
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
            resetControlsTimeout();
        }
    };

    const skip = (amount) => {
        if (videoRef.current) {
            let newTime = videoRef.current.currentTime + amount;
            if (newTime < 0) newTime = 0;
            if (newTime > duration) newTime = duration;
            videoRef.current.currentTime = newTime;
            resetControlsTimeout();
        }
    };

    const playNext = () => {
        if (videos && currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
            setIsPlaying(true);
            resetControlsTimeout();
        } else {
            navigate(-1);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.key === " " || e.code === "Space") {
                e.preventDefault();
                togglePlay();
            } else if (e.key === "Escape") {
                e.preventDefault();
                navigate(-1);
            }
        };

        window.addEventListener("keydown", handleGlobalKeyDown);
        return () => window.removeEventListener("keydown", handleGlobalKeyDown);
    }, [isPlaying, navigate]); // Dependencies for closure

    useTVNavigation({
        onLeft: () => {
            resetControlsTimeout();
            if (focusIndex === 4) {
                skip(-5);
            } else if (focusIndex === 1) {
                setFocusIndex(2);
            } else if (focusIndex === 3) {
                setFocusIndex(1);
            } else if (focusIndex === 2) {
                // Stay on Rewind, don't jump to Back (it's confusing)
                // Users should use Up to go to Back
            }
        },
        onRight: () => {
            resetControlsTimeout();
            if (focusIndex === 4) {
                skip(5);
            } else if (focusIndex === 0) {
                // Don't jump right from Back, force Down usage
            } else if (focusIndex === 2) {
                setFocusIndex(1);
            } else if (focusIndex === 1) {
                setFocusIndex(3);
            } else if (focusIndex === 3) {
                // Stay on Forward
            }
        },
        onEnter: () => {
            resetControlsTimeout();
            if (focusIndex === 0) {
                navigate(-1);
            } else if (focusIndex === 1 || focusIndex === 4) {
                togglePlay();
            } else if (focusIndex === 2) {
                skip(-10);
            } else if (focusIndex === 3) {
                skip(30);
            }
        },
        onBack: () => navigate(-1),
        onUp: () => {
            resetControlsTimeout();
            if (focusIndex === 4) {
                setFocusIndex(1); // Timeline -> Play/Pause
            } else if (focusIndex >= 1 && focusIndex <= 3) {
                setFocusIndex(0); // Controls -> Back
            }
        },
        onDown: () => {
            resetControlsTimeout();
            if (focusIndex === 0) {
                setFocusIndex(1); // Back -> Play/Pause
            } else if (focusIndex >= 1 && focusIndex <= 3) {
                setFocusIndex(4); // Controls -> Timeline
            }
        },
    });

    if (!videoData) return null;

    return (
        <div className="player-container">
            <div className="video-wrapper">
                <video
                    ref={videoRef}
                    src={videoData.url}
                    autoPlay
                    className="main-video"
                    onEnded={playNext}
                    onClick={togglePlay}
                    onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                    onLoadedMetadata={(e) => setDuration(e.target.duration)}
                />
            </div>

            {/* Overlays */}
            <div className={`player-ui ${showControls ? "visible" : "hidden"}`}>
                <div className="top-fade" />
                <div className="bottom-fade" />

                {/* Back Button */}
                <div
                    className={`player-back-btn ${focusIndex === 0 ? "focused" : ""}`}
                    onClick={() => navigate(-1)}
                >
                    <div className="back-btn-frame">Back</div>
                </div>

                {/* Progress & Bottom Controls Area */}
                <div className="player-bottom-controls">
                    <div className="timeline-container">
                        <span className="time-display">{formatTime(currentTime)}</span>
                        <div className="progress-bar-container">
                            <div className="progress-bar-bg">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                                <div
                                    className={`progress-handle ${focusIndex === 4 ? "focused" : ""}`}
                                    style={{ left: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>
                        </div>
                        <span className="time-display">{formatTime(duration)}</span>
                    </div>

                    {/* Control Buttons - Moved from body to bottom area as per request */}
                    <div className="media-controls-row">
                        <div
                            className={`control-btn ${focusIndex === 2 ? "focused" : ""}`}
                            onClick={() => skip(-10)}
                        >
                            <img src={focusIndex === 2 ? "/images/player_rew_on.png" : "/images/player_rew.png"} alt="Rewind" />
                        </div>

                        <div
                            className={`control-btn play-pause ${focusIndex === 1 ? "focused" : ""}`}
                            onClick={togglePlay}
                        >
                            <div className="play-pause-label">{isPlaying ? "Pause" : "Play"}</div>
                        </div>

                        <div
                            className={`control-btn ${focusIndex === 3 ? "focused" : ""}`}
                            onClick={() => skip(30)}
                        >
                            <img src={focusIndex === 3 ? "/images/player_fwd_on.png" : "/images/player_fwd.png"} alt="Forward" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
