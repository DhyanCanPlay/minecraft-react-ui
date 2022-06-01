import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Button.css";

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "clear";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, onClick, active, disabled, className, type, variant, ...rest },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...rest}
        type={type}
        onClick={onClick}
        className={cn("Button", className, {
          [`Button_${variant}`]: variant,
          [`Button_active`]: active,
          [`Button_disabled`]: disabled,
        })}
      >
        <span className={cn("ButtonText")}>{children}</span>
      </button>
    );
  }
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "clear"]),
};

Button.defaultProps = {
  variant: "secondary",
};

Button.displayName = "Button";

export default Button;
