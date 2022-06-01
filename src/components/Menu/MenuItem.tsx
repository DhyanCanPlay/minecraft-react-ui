import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./MenuItem.css";

export type MenuItemProps = {
  id: string;
  label: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
};

const MenuItem = ({ label, onClick, disabled }) => {
  return (
    <div
      onClick={onClick}
      className={cn("MenuItem", { [`MenuItem_disabled`]: disabled })}
    >
      {label}
    </div>
  );
};

MenuItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default MenuItem;
