import React from "react";

const InputWithLabel = ({ inputs, input, handleChange }) => {
  return (
    <>
      {" "}
      <label htmlFor={input.id} className="form__label">
        {input.label}
      </label>
      <input
        className="form__input"
        type={input.type}
        id={input.id}
        name={input.name}
        value={inputs}
        onChange={handleChange}
        placeholder={input.placeholder}
      />
    </>
  );
};

export default InputWithLabel;
