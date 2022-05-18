import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Input.css";

export type InputProps = Omit<React.HTMLProps<HTMLInputElement>, "onChange"> & {
  onChange: (value: string) => void;
  disabled: boolean;
};

const Input = ({ onChange, disabled, ...rest }: InputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <input
      disabled={disabled}
      onChange={handleChange}
      className={cn("Input", {
        "Input-disabled": disabled,
      })}
      {...rest}
    />
  );
};

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;
