import { useMemo, useState } from "react";

export default function PlantAnimation({ focusActive = false, growthPulse = false }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x, y });
  };

  const handleLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const motionStyle = useMemo(() => {
    return {
      transform: `translate3d(${tilt.x * 12}px, ${tilt.y * 8}px, 0)`,
    };
  }, [tilt]);

  return (
    <div className="absolute inset-0" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="scene-sun" aria-hidden="true" />
      <div className="scene-cloud" aria-hidden="true" />
      <div className="scene-cloud cloud-2" aria-hidden="true" />
      <div
        className={`scene-layer ${focusActive ? "scene-focus" : ""} ${
          growthPulse ? "scene-grow" : ""
        }`}
        style={motionStyle}
      >
        <svg
          viewBox="0 0 1200 500"
          preserveAspectRatio="xMidYEnd meet"
          className="scene-hills"
          aria-hidden="true"
        >
          <path
            className="scene-back"
            d="M0 260 C 200 180, 380 210, 520 260 C 680 315, 860 310, 1200 200 L1200 500 L0 500 Z"
          />
          <path
            className="scene-mid"
            d="M0 320 C 220 250, 420 280, 620 330 C 820 380, 980 360, 1200 300 L1200 500 L0 500 Z"
          />
          <path
            className="scene-front"
            d="M0 380 C 200 340, 420 380, 640 420 C 860 460, 1020 450, 1200 400 L1200 500 L0 500 Z"
          />
        </svg>
      </div>
      <div className="scene-field" aria-hidden="true" />
    </div>
  );
}
