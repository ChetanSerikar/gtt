import React from "react";
import RightArrow from "../assets/rightarrow.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LastArrow from "../assets/Circle.svg";

const Onboarding = ({
  title,
  desc,
  length,
  currOnboard,
  setCurrOnboard,
  current,
}) => {
  const navigate = useNavigate();
  return (
    <div className="onboarding__card">
      <div className="onboarding__card-title">{title}</div>
      <div className="onboarding__card-desc">{desc}</div>
      <div className={`progress__wrapper`}>
        <div
          className={`onboarding__card-progress ${
            current === length - 1 ? "last-margin" : null
          }`}
        >
          {new Array(length).fill(0).map((_, i) => (
            <div
              className={`progress ${currOnboard == i ? "active" : null}`}
              key={i}
            ></div>
          ))}
        </div>
      </div>

      {current < length - 1 ? (
        <div className="onboarding__card-buttons">
          <button
            onClick={() => navigate("/login")}
            className="onboarding__card-skip"
          >
            Skip
          </button>
          <button
            disabled={currOnboard == length - 1}
            onClick={() => setCurrOnboard()}
            className="onboarding__card-next"
          >
            Next <img src={RightArrow} alt="" />
          </button>
        </div>
      ) : (
        <Link to="/login" className="onboard__last">
          <img src={LastArrow} alt="" />
        </Link>
      )}
    </div>
  );
};

export default Onboarding;
