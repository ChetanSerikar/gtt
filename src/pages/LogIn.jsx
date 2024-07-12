import React from "react";
import { useState } from "react";
import InputWithLabel from "../Components/InputWithLabel";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormHead from "../Components/FormHead";
import SignInAlt from "../Components/SignInAlt";

const LogIn = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // api call to server
    navigate("/postlogin");
  };

  const inputData = [
    {
      type: "email",
      id: "email",
      name: "email",
      placeholder: "Enter Email",
      label: "Email Address",
    },
    {
      type: "password",
      id: "password",
      name: "password",
      placeholder: "Enter Password",
      label: "Password",
    },
  ];
  return (
    <div className="login">
      <FormHead
        title="Login to your account."
        desc="Please sign in to your account"
      />
      <form className="form">
        {inputData.map((input, i) => (
          <InputWithLabel
            key={i}
            inputs={inputs[input.name]}
            input={input}
            handleChange={handleChange}
          />
        ))}
        <Link className="form__fp" to="/login">
          Forgot Password ?
        </Link>
        <button className="form__submit" onClick={handleSignUp}>
          Sign In
        </button>
      </form>
      <SignInAlt />
    </div>
  );
};

export default LogIn;
