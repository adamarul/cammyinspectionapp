import React, { useState, useEffect } from "react";

const CurrentTimeDisplay = ({ nextInspectionTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const inspectionDate = new Date(nextInspectionTime);
  const difference = inspectionDate - currentTime;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <div>
      <p>
        Current Time: {currentTime.getMonth() + 1}/{currentTime.getDate()}{" "}
        {currentTime.getHours()}:{currentTime.getMinutes()}
      </p>
      <p>
        Next Inspection in: {days > 0 ? `${days} days` : ""} {hours} hours{" "}
        {minutes} minutes
      </p>
    </div>
  );
};

export default CurrentTimeDisplay;
