import React from "react";

const FormHead = ({ title, desc }) => {
  return (
    <>
      <div className="login__title">{title}</div>
      <div className="login__desc"> {desc} </div>
    </>
  );
};

export default FormHead;
