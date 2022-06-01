import React from "react";
import PropTypes from "prop-types";
import Dropdown, { DropdownProps } from "../Dropdown";
import Button, { ButtonProps } from "../Button";
import Menu, { MenuProps, MenuIcon } from "../Menu";

export type DropdownMenuProps = MenuProps & ButtonProps & DropdownProps;

const DropdownMenu = ({
  items,
  placement,
}: MenuProps & ButtonProps & Omit<DropdownProps, "children" | "content">) => {
  return (
    <Dropdown placement={placement} content={<Menu items={items} z />}>
      <Button variant={"clear"}>
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
