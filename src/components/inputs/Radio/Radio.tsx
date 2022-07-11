import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Radio.css";

export type RadioProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange" | "value"
> & {
  value?: string;
  checked?: boolean;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
};

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    { onChange, disabled, className, value, checked, indeterminate, ...rest },
    ref?
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value, event);
    };
    return (
      <input
        ref={ref}
        type="radio"
        disabled={disabled}
        value={value}
        checked={checked}
        onChange={handleChange}
        className={cn("Radio", className, {
          [`Radio_indeterminate`]: indeterminate,
        })}
        {...rest}
      />
    );
  }
);

Radio.propTypes = {
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  className: PropTypes.string,
};

export default Radio;
