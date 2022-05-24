import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./ButtonGroup.css";
import Button, { ButtonProps } from "../Button";

type ButtonGroupOptionProps = ButtonProps & { value: string; label: string };

export type ButtonGroupProps = {
  value: string;
  onChange?: (value: string) => void;
  options: Array<ButtonGroupOptionProps>;
  disabled?: boolean;
  className?: string;
};

const ButtonGroup = ({
  options,
  disabled,
  className,
  onChange,
  value,
}: ButtonGroupProps) => {
  console.log("ButtonGroup", value);
  console.log(onChange);
  const handleClick = (option: ButtonGroupOptionProps) => {
    if (option.onClick) {
      option.onClick();
    }
    if (onChange) {
      onChange(option.value);
    }
  };
  return (
    <div className={cn("ButtonGroup", className)}>
      {options.map((option, index) => (
        <Button
          key={index}
          disabled={disabled}
          type={"button"}
          active={option.value === value}
          className={cn("ButtonGroupButton", {
            "ButtonGroupButton-active": option.value === value,
          })}
          onClick={() => handleClick(option)}
          variant={option.value === value ? "primary" : "secondary"}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

ButtonGroup.defaultProps = {};

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
