import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import FocusButtons from "./FocusButtons";
import BreakButtons from "./BreakButtons";
import SessionProgress from "./SessionProgress";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running

  const [session, setSession] = useState(null);

  //My new code
  //Turns focusDuration and breakDuration into states
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);

  //Code for formating durations to mm:ss
  const formatDuration = (duration) => {
    const durationStrLength = duration.toString().length;
    return durationStrLength === 1 ? `0${duration}:00` : `${duration}:00`;
  };
  //Formatted Durations
  const formattedFocusDuration = formatDuration(focusDuration);
  const formattedBreakDuration = formatDuration(breakDuration);

  //Code for increasing and decreasing focusDuration between 5-60
  const handleIncreaseFocusClick = () => {
    setFocusDuration(Math.min(60, focusDuration + 5));
  };
  const handleDecreaseFocusClick = () => {
    setFocusDuration(Math.max(5, focusDuration - 5));
  };

  //Code for increasing and decreasing breakDuration between 1-15
  const handleIncreaseBreakClick = () => {
    setBreakDuration(Math.min(15, breakDuration + 1));
  };
  const handleDecreaseBreakClick = () => {
    setBreakDuration(Math.max(1, breakDuration - 1));
  };

  //Code for handling Stop button
  const handleStopButtonClick = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  //Code to change secs to mm:ss
  function secondsToMinSec(sec) {
    return new Date(sec * 1000).toUTCString().split(" ")[4].slice(3);
  }

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusButtons
          decreaseFocus={handleDecreaseFocusClick}
          increaseFocus={handleIncreaseFocusClick}
          session={session}
          focusDuration={formattedFocusDuration}
        />

        <BreakButtons
          decreaseBreak={handleDecreaseBreakClick}
          increaseBreak={handleIncreaseBreakClick}
          session={session}
          breakDuration={formattedBreakDuration}
        />
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled={session === null ? true : false}
              onClick={handleStopButtonClick}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <SessionProgress
        session={session}
        formattedFocusDuration={formattedFocusDuration}
        formattedBreakDuration={formattedBreakDuration}
        formatMinSec={secondsToMinSec}
        breakDuration={breakDuration}
        focusDuration={focusDuration}
      />
    </div>
  );
}

export default Pomodoro;
