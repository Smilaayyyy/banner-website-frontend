import React, { useState, useEffect } from 'react';
import '../CountdowmTimer.css';

function CountdownTimer({ initialTimer }) {
  const [timer, setTimer] = useState(initialTimer);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = (timer / initialTimer) * circumference;

  return (
    <div className="timer-container">
      <svg className="timer-svg" height="120" width="120">
        <circle
          className="timer-background"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="none"
        />
        <circle
          className="timer-progress"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
        />
      </svg>
      <div className="timer-text">{timer > 0 ? timer : 'Time is up!'}</div>
    </div>
  );
}

export default CountdownTimer;

