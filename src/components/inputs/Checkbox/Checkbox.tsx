import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Checkbox.css";

export type CheckboxProps = Omit<
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
};

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ onChange, disabled, className, value, indeterminate, ...rest }, ref) => {
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
        className={cn("Checkbox", className, {
          [`Checkbox_indeterminate`]: indeterminate,
        })}
        {...rest}
      />
    );
  }
);

Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default Checkbox;
