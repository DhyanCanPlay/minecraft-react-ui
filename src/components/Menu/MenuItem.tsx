import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./MenuItem.css";

export type MenuItemProps = React.HTMLProps<HTMLInputElement> & {
  id: string;
  label: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
  [key: string]: any;
};

const MenuItem = ({ label, onClick, disabled, ...rest }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn("MenuItem", { [`MenuItem_disabled`]: disabled })}
      {...rest}
    >
      {label}
    </div>
  );
};

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default MenuItem;
