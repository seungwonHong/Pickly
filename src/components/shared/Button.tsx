import React from "react";

interface Props {
  disabled: boolean;
  classname: string;
  placeholder: string;
  textcolor: string;
  type: string;
}

const Button = ({ disabled, classname, placeholder, textcolor }: Props) => {
  const buttonColor = disabled ? "grey" : "blue";
  const textColor = disabled ? "grey" : textcolor;

  return (
    <button
      disabled={disabled}
      className={`${classname} bg-[${buttonColor}] ${classname}`}
    >
      {placeholder}
    </button>
  );
};

export default Button;

//
