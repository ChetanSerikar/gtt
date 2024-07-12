import React from "react";
import FormHead from "../Components/FormHead";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../Components/InputWithLabel";
import SignInAlt from "../Components/SignInAlt";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
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
    navigate("/login");
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
      type: "text",
      id: "name",
      name: "name",
      placeholder: "Enter User Name",
      label: "User Name",
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
    <div className="signup">
      <FormHead
        title="Create your new account"
        desc="Create an account to start looking for the food you like"
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
        <div className="tandc">
          <input
            className="tandc__checkbox"
            type="checkbox"
            name="tandc"
            id="tandc"
          />
          <label htmlFor="tandc">
            I Agree with
            <Link to="/signup">Terms of Service</Link>
            and
            <Link to="/signup">Privacy Policy</Link>
          </label>
        </div>
        <button className="form__submit" onClick={handleSignUp}>
          Sign In
        </button>
      </form>
      <SignInAlt />
    </div>
  );
};

export default SignUp;
