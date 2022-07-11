import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Switch.css";

export type SwitchProps = Omit<
  React.HTMLProps<HTMLInputElement>,
  "onChange" | "value"
> & {
  value: boolean;
  onChange: (
    value: boolean,
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  label?: string;
};

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      onChange,
      disabled,
      className,
      value,
      indeterminate,
      label,
      onClick,
      ...rest
    },
    ref?
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.checked, event);
    };
    return (
      <input
        ref={ref}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={handleChange}
        className={cn("Switch", className, {
          [`Switch_indeterminate`]: indeterminate,
        })}
        {...rest}
      />
    );
  }
);

Switch.propTypes = {
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Switch;
