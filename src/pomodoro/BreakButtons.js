import React from "react";
function BreakButtons({
  decreaseBreak,
  increaseBreak,
  session,
  breakDuration,
}) {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {breakDuration}
          </span>

          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={decreaseBreak}
              disabled={session}
            >
              <span className="oi oi-minus" />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={increaseBreak}
              disabled={session}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BreakButtons;
