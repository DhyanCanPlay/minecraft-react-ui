import React from "react";
import PropTypes from "prop-types";
import Dropdown, { DropdownProps } from "../Dropdown";
import Button, { ButtonProps } from "../Button";
import Menu, { MenuProps, MenuIcon } from "../Menu";

export type DropdownMenuProps = MenuProps & ButtonProps & DropdownProps;

const DropdownMenu = ({
  items,
  placement,
  className,
  onClick,
  tabIndex,
}: MenuProps & ButtonProps & Omit<DropdownProps, "children" | "content">) => {
  return (
    <Dropdown
      closeOnClickOutside
      closeOnClickContent
      placement={placement}
      content={<Menu items={items} />}
    >
      <Button
        onClick={onClick}
        variant={"clear"}
        className={className}
        tabIndex={tabIndex}
      >
        <MenuIcon />
      </Button>
    </Dropdown>
  );
};

DropdownMenu.propTypes = {
  placement: PropTypes.string,
};

DropdownMenu.defaultProps = {
  placement: "bottom-start",
};

export default DropdownMenu;
