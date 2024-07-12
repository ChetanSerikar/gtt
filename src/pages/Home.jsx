import React from "react";
import Onboarding from "../Components/Onboarding";
import onboard1 from "../assets/onboarding1.jpg";
import onboard2 from "../assets/onboarding2.jpg";
import onboard3 from "../assets/onboarding3.jpg";
import { useState } from "react";
import { useRef } from "react";

const Home = () => {
  const [currOnboard, setCurrOnboard] = useState(0);
  const conatinerRef = useRef();
  const onBordingData = [
    {
      id: 1,
      img: onboard1,
      title: "We serve incomparable delicacies",
      desc: "All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!",
    },
    {
      id: 2,
      img: onboard2,
      title: "We serve incomparable delicacies",
      desc: "All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!",
    },
    {
      id: 3,
      img: onboard3,
      title: "We serve incomparable delicacies",
      desc: "All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!",
    },
  ];
  const handleClick = () => {
    if (currOnboard == onBordingData.length - 1) return;
    setCurrOnboard((prev) => prev + 1);

    conatinerRef.current.scrollLeft =
      conatinerRef.current.scrollLeft +
      conatinerRef.current.getBoundingClientRect().width;
  };
  return (
    <div className=" home_grid" ref={conatinerRef}>
      {onBordingData.map((data, i) => (
        <div
          key={i}
          className="home"
          style={{
            backgroundImage: `url(${onBordingData[currOnboard].img})`,
            gridAutoColumns: "100vw",
          }}
        >
          <section className="onboarding">
            <Onboarding
              key={i}
              title={data.title}
              desc={data.desc}
              length={onBordingData.length}
              currOnboard={currOnboard}
              setCurrOnboard={handleClick}
            />
          </section>
        </div>
      ))}
    </div>
  );
};

export default Home;
