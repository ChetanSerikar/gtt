import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const Clock2 = () => {
  const [currTime, setCurrTime] = useState(new Date());
  const [speed, setSpeed] = useState(1);
  const intervalRef = useRef();
  const [startTime, setStartTime] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    const startTimeParam = queryParams.get("startTime");
    return startTimeParam ? new Date(parseInt(startTimeParam)) : new Date();
  });

  const endTime = new Date(startTime.getTime() - 1000 * 60 * 120);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("speed")) {
      setSpeed(parseFloat(urlParams.get("speed")));
    }
  }, []);

  useEffect(() => {
    const updateClock = () => {
      setCurrTime((prevTime) => {
        const now = new Date();
        const elapsedTime =
          new Date(now.getTime() - startTime.getTime()) * speed;
        const newTime = new Date(startTime.getTime() - elapsedTime);
        if (newTime <= endTime) {
          clearInterval(intervalRef.current);
          return endTime;
        }
        return newTime;
      });
    };

    intervalRef.current = setInterval(updateClock, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [startTime, endTime, speed]);

  const getDegrees = (date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDegrees = (hours + minutes / 60) * 30;
    const minuteDegrees = (minutes + seconds / 60) * 6;
    const secondDegrees = seconds * 6;

    return { hourDegrees, minuteDegrees, secondDegrees };
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}hr : ${minutes}min : ${seconds}sec`;
  };

  const { hourDegrees, minuteDegrees, secondDegrees } = getDegrees(currTime);
  const { hourDegrees: startHourDegrees, minuteDegrees: startMinuteDegrees } =
    getDegrees(startTime);
  const { hourDegrees: endHourDegrees, minuteDegrees: endMinuteDegrees } =
    getDegrees(endTime);

  const handleShare = (e) => {
    e.preventDefault();
    const url = `${window.location.origin}${
      window.location.pathname
    }?startTime=${startTime.getTime()}&speed=${speed}`;
    navigator.clipboard.writeText(url);
    alert(`Shareable URL copied to clipboard: ${url}`);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };
  return (
    <>
      <div className="clock">
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourDegrees}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minuteDegrees}deg)` }}
        />
        <div
          className="hand second"
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        />
        <div className="center" />
        <div
          className="marker start"
          style={{
            transform: `rotate(${startHourDegrees - 90}deg) translateX(100px)`,
          }}
        />
        <div
          className="marker end"
          style={{
            transform: `rotate(${endHourDegrees - 90}deg) translateX(100px)`,
          }}
        />
      </div>
      <div className="clock__values">
        <div>Start Time || {formatTime(startTime)}</div>
        <div> End Time || {formatTime(endTime)}</div>
        <div>Remaining Time || {formatTime(currTime)}</div>
      </div>
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={speed}
        onChange={handleSpeedChange}
        className="speed-slider"
      />
      <p className="speed">Speed: {speed.toFixed(1)}x</p>
      <button className="share-btn" onClick={handleShare}>
        share
      </button>
    </>
  );
};

export default Clock2;
