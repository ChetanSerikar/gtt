import React from "react";
import goggle from "../assets/google.svg";
import { Link } from "react-router-dom";

const SignInAlt = () => {
  return (
    <div className="altsignin">
      <div className="altsignin__title">
        <div className="altsignin__title-line"></div>
        <div className="altsignin__title-text">Or sign in with</div>
        <div className="altsignin__title-line"></div>
      </div>
      <button className="altsignin__button-goggle">
        <img src={goggle} alt="" />
      </button>

      <div className="altsignin__register">
        Don't have an account ? <Link to="/signup">Register</Link>{" "}
      </div>
    </div>
  );
};

export default SignInAlt;
