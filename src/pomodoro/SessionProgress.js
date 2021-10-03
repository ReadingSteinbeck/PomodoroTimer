import React from "react";
import ProgressBar from "./ProgressBar";
import SessionTitle from "./SessionTitle";

function SessionProgress({
  session,
  formattedFocusDuration,
  formattedBreakDuration,
  formatMinSec,
  breakDuration,
  focusDuration,
}) {
  const content = (
    <div>
      {/* TODO: This area should show only when there is an active focus or break - i.e. the session is running or is paused */}
      <SessionTitle
        session={session}
        formattedFocusDuration={formattedFocusDuration}
        formattedBreakDuration={formattedBreakDuration}
        formatMinSec={formatMinSec}
      />
      <ProgressBar
        session={session}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
      />
    </div>
  );
  return session !== null ? content : null;
}
export default SessionProgress;
