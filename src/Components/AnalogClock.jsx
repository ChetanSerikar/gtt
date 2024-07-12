// import React, { useEffect, useState, useRef } from "react";

// const AnalogClock = ({ speed = 1 }) => {
//   const [time, setTime] = useState(new Date());
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     const updateClock = () => {
//       setTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
//     };

//     intervalRef.current = setInterval(updateClock, 1000);

//     return () => clearInterval(intervalRef.current);
//   }, [speed]);

//   const hours = time.getHours() % 12;
//   const minutes = time.getMinutes();
//   const seconds = time.getSeconds();

//   const hourDegrees = (hours + minutes / 60) * 30;
//   const minuteDegrees = (minutes + seconds / 60) * 6;
//   const secondDegrees = seconds * 6;

//   return (
//     <div className="clock">
//       <div
//         className="hand hour"
//         style={{ transform: `rotate(${-hourDegrees}deg)` }}
//       />
//       <div
//         className="hand minute"
//         style={{ transform: `rotate(${-minuteDegrees}deg)` }}
//       />
//       <div
//         className="hand second"
//         style={{ transform: `rotate(${secondDegrees}deg)` }}
//       />
//       <div className="center" />
//     </div>
//   );
// };

// export default AnalogClock;

// import React, { useEffect, useState, useRef } from "react";

// const AnalogClock = ({ speed }) => {
//   const [time, setTime] = useState(new Date());
//   const [startTime, setStartTime] = useState(() => {
//     const storedStartTime = localStorage.getItem("startTime");
//     return storedStartTime ? new Date(storedStartTime) : new Date();
//   });
//   const [endTime, setEndTime] = useState(() => {
//     const storedEndTime = localStorage.getItem("endTime");
//     return storedEndTime
//       ? new Date(storedEndTime)
//       : new Date(startTime.getTime() - 120 * 60 * 1000);
//   });
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (!localStorage.getItem("startTime")) {
//       localStorage.setItem("startTime", startTime);
//       localStorage.setItem("endTime", endTime);
//     }
//   }, [startTime, endTime]);

//   useEffect(() => {
//     const updateClock = () => {
//       setTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
//     };

//     intervalRef.current = setInterval(updateClock, 1000);

//     return () => clearInterval(intervalRef.current);
//   }, [speed]);

//   const getDegrees = (date) => {
//     const hours = date.getHours() % 12;
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();

//     const hourDegrees = (hours + minutes / 60) * 30;
//     const minuteDegrees = (minutes + seconds / 60) * 6;
//     const secondDegrees = seconds * 6;

//     return { hourDegrees, minuteDegrees, secondDegrees };
//   };

//   const { hourDegrees, minuteDegrees, secondDegrees } = getDegrees(time);
//   const { hourDegrees: startHourDegrees, minuteDegrees: startMinuteDegrees } =
//     getDegrees(startTime);
//   const { hourDegrees: endHourDegrees, minuteDegrees: endMinuteDegrees } =
//     getDegrees(endTime);

//   return (
//     <div className="clock">
//       <div
//         className="hand hour"
//         style={{ transform: `rotate(${hourDegrees}deg)` }}
//       />
//       <div
//         className="hand minute"
//         style={{ transform: `rotate(${minuteDegrees}deg)` }}
//       />
//       <div
//         className="hand second"
//         style={{ transform: `rotate(${secondDegrees}deg)` }}
//       />
//       <div className="center" />
//       <div
//         className="marker start"
//         style={{
//           transform: `rotate(${startHourDegrees - 90}deg) translateX(100px)`,
//         }}
//       />
//       <div
//         className="marker end"
//         style={{
//           transform: `rotate(${endHourDegrees - 90}deg) translateX(100px)`,
//         }}
//       />
//     </div>
//   );
// };

// // export default AnalogClock;

// import React, { useCallback, useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";

// const AnalogClock = ({ speed, setSpeed }) => {
//   const [time, setTime] = useState(new Date(Date.now()));

//   const intervalRef = useRef(null);

//   const location = useLocation();

//   const [startTime, setStartTime] = useState(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const startTime = queryParams.get("startTime");
//     return startTime ? new Date(parseInt(startTime)) : new Date(Date.now());
//   });

//   const endTime = new Date(startTime.getTime() - 120 * 60 * 1000);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const speedParam = queryParams.get("speed");

//     if (speedParam) {
//       setSpeed(parseFloat(speedParam));
//     }

//     const updateClock = () => {
//       setTime((prevTime) => new Date(prevTime.getTime() - 1000 * speed));
//     };

//     intervalRef.current = setInterval(updateClock, 1000);

//     return () => clearInterval(intervalRef.current);
//   }, [location.search, speed, setSpeed]);

//   const getDegrees = (date) => {
//     const hours = date.getHours() % 12;
//     const minutes = date.getMinutes();
//     const seconds = date.getSeconds();

//     const hourDegrees = (hours + minutes / 60) * 30;
//     const minuteDegrees = (minutes + seconds / 60) * 6;
//     const secondDegrees = seconds * 6;

//     return { hourDegrees, minuteDegrees, secondDegrees };
//   };
//   const formatTime = (date) => {
//     const hours = date.getHours().toString().padStart(2, "0");
//     const minutes = date.getMinutes().toString().padStart(2, "0");
//     const seconds = date.getSeconds().toString().padStart(2, "0");
//     return `${hours}:${minutes}:${seconds}`;
//   };

//   const { hourDegrees, minuteDegrees, secondDegrees } = getDegrees(time);
//   const { hourDegrees: startHourDegrees, minuteDegrees: startMinuteDegrees } =
//     getDegrees(startTime);
//   const { hourDegrees: endHourDegrees, minuteDegrees: endMinuteDegrees } =
//     getDegrees(endTime);

//   const handleShare = () => {
//     const url = `${
//       window.location.origin
//     }/postlogin?startTime=${startTime.getTime()}&speed=${speed}`;
//     navigator.clipboard.writeText(url);
//     alert(`Shareable URL copied to clipboard: ${url}`);
//   };

//   // console.log(time);
//   return (
//     <div>
//       <div className="clock">
//         <div
//           className="hand hour"
//           style={{ transform: `rotate(${hourDegrees}deg)` }}
//         />
//         <div
//           className="hand minute"
//           style={{ transform: `rotate(${minuteDegrees}deg)` }}
//         />
//         <div
//           className="hand second"
//           style={{ transform: `rotate(${secondDegrees}deg)` }}
//         />
//         <div className="center" />
//         <div
//           className="marker start"
//           style={{
//             transform: `rotate(${startHourDegrees - 90}deg) translateX(100px)`,
//           }}
//         />
//         <div
//           className="marker end"
//           style={{
//             transform: `rotate(${endHourDegrees - 90}deg) translateX(100px)`,
//           }}
//         />
//       </div>
//       <div>{formatTime(time)}</div>
//       <button onClick={handleShare}>Share</button>
//     </div>
//   );
// };

// export default AnalogClock;

import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const AnalogClock = () => {
  const [speed, setSpeed] = useState(1);
  const [time, setTime] = useState(new Date());
  const intervalRef = useRef(null);
  const location = useLocation();

  const [startTime, setStartTime] = useState(() => {
    const queryParams = new URLSearchParams(location.search);
    const startTimeParam = queryParams.get("startTime");
    return startTimeParam ? new Date(parseInt(startTimeParam)) : new Date();
  });

  const endTime = new Date(startTime.getTime() - 120 * 60 * 1000);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const speedParam = queryParams.get("speed") || 1;

    if (speedParam) {
      setSpeed(parseFloat(speedParam));
    }

    const updateClock = () => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime.getTime() - 1000 * speed);
        if (newTime <= endTime) {
          clearInterval(intervalRef.current);
          return endTime;
        }
        return newTime;
      });
    };

    intervalRef.current = setInterval(updateClock, 1000);

    return () => clearInterval(intervalRef.current);
  }, [location.search, speed, endTime]);

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
    return `${hours}:${minutes}:${seconds}`;
  };

  const { hourDegrees, minuteDegrees, secondDegrees } = getDegrees(time);
  const { hourDegrees: startHourDegrees, minuteDegrees: startMinuteDegrees } =
    getDegrees(startTime);
  const { hourDegrees: endHourDegrees, minuteDegrees: endMinuteDegrees } =
    getDegrees(endTime);

  const handleShare = () => {
    const url = `${window.location.origin}${
      window.location.pathname
    }?startTime=${startTime.getTime()}&speed=${speed}`;
    navigator.clipboard.writeText(url);
    alert(`Shareable URL copied to clipboard: ${url}`);
  };

  return (
    <div>
      <div className="clock">
        <div
          className="hand hour"
          style={{ transform: `rotate(${hourDegrees}deg)` }}
        />
        <div
          className="hand minute"
          style={{ transform: `rotate(${minuteDegrees + 180}deg)` }}
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
      <div>{formatTime(time)}</div>
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
      />
      <span>{speed}</span>
      <button onClick={handleShare}>Share</button>
    </div>
  );
};

export default AnalogClock;
