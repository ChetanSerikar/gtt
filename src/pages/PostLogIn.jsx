import React from "react";
import Clock2 from "../Components/Clock2";
import { Link } from "react-router-dom";
import BG from "../assets/onboarding1.jpg";
import Tick from "../assets/postlogin.jpg";

const PostLogIn = () => {
  return (
    <div className="postlogin" style={{ backgroundImage: `url(${BG})` }}>
      <div className="postlogin__card">
        <img src={Tick} alt="" />
        <div className="postlogin__card-title">Login Successful</div>
        <button className="button">
          <Link to="/trackingscreen">Tracking Screem</Link>
        </button>
        <button className="logout">
          <Link to="/login">LogOut</Link>{" "}
        </button>
      </div>
    </div>
  );
};

export default PostLogIn;