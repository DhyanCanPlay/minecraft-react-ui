import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Input.css";

export type InputProps = Omit<React.HTMLProps<HTMLInputElement>, "onChange"> & {
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const Input = React.forwardRef(
  ({ onChange, disabled, className, ...rest }: InputProps, ref: React.Ref) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    };
    return (
      <input
        ref={ref}
        disabled={disabled}
        onChange={handleChange}
        className={cn("Input", className, {
          "Input-disabled": disabled,
        })}
        {...rest}
      />
    );
  }
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Input;
