import React from "react";

const SpeedSlider = ({ speed, setSpeed }) => {
  const handleChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="10"
        step="0.1"
        value={speed}
        onChange={handleChange}
      />
      <span>{speed}x</span>
    </div>
  );
};

export default SpeedSlider;
