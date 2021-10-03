import React from "react";
function SessionTitle({
  session,
  formattedFocusDuration,
  formattedBreakDuration,
  formatMinSec,
}) {
  return (
    <div className="row mb-2">
      <div className="col">
        {/* TODO: Update message below to include current session (Focusing or On Break) total duration */}
        <h2 data-testid="session-title">
          {/*  */}
          {session?.label} for{" "}
          {session?.label === "Focusing"
            ? formattedFocusDuration
            : formattedBreakDuration}{" "}
          minutes
        </h2>
        {/* TODO: Update message below correctly format the time remaining in the current session */}
        <p className="lead" data-testid="session-sub-title">
          {formatMinSec(session?.timeRemaining)} remaining
        </p>
      </div>
    </div>
  );
}
export default SessionTitle;
