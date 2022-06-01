import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import MenuItem, { MenuItemProps } from "./MenuItem";
import "./Menu.css";

export type MenuProps = {
  items: Array<MenuItemProps>;
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({ items }, ref) => {
  return (
    <div ref={ref} className={cn("Menu")}>
      {items.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </div>
  );
});

Menu.displayName = "Menu";

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Menu;
