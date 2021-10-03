import React from "react";
function ProgressBar({ session, focusDuration, breakDuration }) {
  //Code to handle progress bar updating   ============================Needs work
  const handleProgressBar = () => {
    const duration =
      session.label === "Focusing" ? focusDuration : breakDuration;
    return (1 - session?.timeRemaining / (duration * 60)) * 100;
  };

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={handleProgressBar()} // TODO: Increase aria-valuenow as elapsed time increases
            style={{ width: `${handleProgressBar()}%` }} // TODO: Increase width % as elapsed time increases
          />
        </div>
      </div>
    </div>
  );
}
export default ProgressBar;
