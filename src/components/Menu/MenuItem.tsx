import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./MenuItem.css";

const MenuItem = ({ label, onClick, disabled }: MenuItemProps) => {
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
