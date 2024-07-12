import React, { useState, useEffect, useRef } from "react";

function NewClock() {
  const [speed, setSpeed] = useState(1);
  const [startTime, setStartTime] = useState(new Date(Date.now()));
  const [handPositions, setHandPositions] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const clockRef = useRef(null);
  const endTime = new Date(startTime.getTime() - 120 * 60 * 1000);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("speed") && urlParams.has("startTime")) {
      setSpeed(parseFloat(urlParams.get("speed")));
      setStartTime(new Date(parseInt(urlParams.get("startTime"))));
      setHandPositions({
        hour: parseFloat(urlParams.get("hour")),
        minute: parseFloat(urlParams.get("minute")),
        second: parseFloat(urlParams.get("second")),
      });
    }
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const elapsedTime = now - startTime;
      const time = new Date(startTime.getTime() + elapsedTime);

      const hours = time.getHours() % 12;
      const minutes = time.getMinutes();
      const seconds = time.getSeconds();

      const hourDeg = ((hours + minutes / 60) / 12) * 360;
      const minuteDeg = ((minutes + seconds / 60) / 60) * 360;
      const secondDeg = (seconds / 60) * 360 * speed;

      if (time <= endTime) {
        setHandPositions({
          hour: (endTime.getHours() % 12) * 30,
          minute: endTime.getMinutes() * 6,
          second: endTime.getSeconds() * 6,
        });
        return;
      }

      if (clockRef.current) {
        clockRef.current.style.setProperty("--hour-rotation", `-${hourDeg}deg`);
        clockRef.current.style.setProperty(
          "--minute-rotation",
          `-${minuteDeg}deg`
        );
        clockRef.current.style.setProperty(
          "--second-rotation",
          `-${secondDeg}deg`
        );
      }

      requestAnimationFrame(updateClock);
    };

    updateClock();
  }, [speed, startTime]);

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("speed", speed);
    url.searchParams.set("startTime", startTime.getTime());
    url.searchParams.set("hour", handPositions.hour);
    url.searchParams.set("minute", handPositions.minute);
    url.searchParams.set("second", handPositions.second);

    // In a real application, you'd want to generate a unique, short ID here
    // and store the state on a server. For this example, we'll just use the URL parameters.
    alert(`Share this URL: ${url.toString()}`);
  };
  const getDegrees = (date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const hourDegrees = (hours + minutes / 60) * 30;
    const minuteDegrees = (minutes + seconds / 60) * 6;
    const secondDegrees = seconds * 6;

    return { hourDegrees, minuteDegrees, secondDegrees };
  };

  const { hourDegrees: startHourDegrees, minuteDegrees: startMinuteDegrees } =
    getDegrees(startTime);
  const { hourDegrees: endHourDegrees, minuteDegrees: endMinuteDegrees } =
    getDegrees(endTime);

  return (
    <div className="App">
      <div className="clock" ref={clockRef}>
        <div className="hand hour"></div>
        <div className="hand minute"></div>
        <div className="hand second"></div>
        <div className="center-dot"></div>
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
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={speed}
        onChange={handleSpeedChange}
        className="speed-slider"
      />{" "}
      <span>{speed}</span>
      <button onClick={handleShare} className="share-btn">
        Share
      </button>
      <div>
        {startTime.getHours()} : {startTime.getMinutes()} :{" "}
        {startTime.getSeconds()}
      </div>
    </div>
  );
}

export default NewClock;
