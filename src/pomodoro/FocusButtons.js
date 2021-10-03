import React from "react";
function FocusButtons({
  decreaseFocus,
  increaseFocus,
  session,
  focusDuration,
}) {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {focusDuration}
        </span>

        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={decreaseFocus}
            disabled={session === null ? false : true}
          >
            <span className="oi oi-minus" />
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={increaseFocus}
            disabled={session === null ? false : true}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default FocusButtons;
