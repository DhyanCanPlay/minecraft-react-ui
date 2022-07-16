import React from "react";
import PropTypes from "prop-types";
import Dropdown, { DropdownProps } from "@/components/layers/Dropdown";
import Button, { ButtonProps } from "@/components/buttons/Button";
import Menu, { MenuProps, MenuIcon } from "@/components/content/Menu";

export type DropdownMenuProps = MenuProps & ButtonProps & DropdownProps;

const DropdownMenu = ({
  items,
  placement,
  className,
  onClick,
  tabIndex,
}: MenuProps & ButtonProps & Omit<DropdownProps, "target" | "content">) => {
  return (
    <Dropdown
      closeOnClickOutside
      closeOnClickContent
      placement={placement}
      content={<Menu items={items} />}
      target={
        <Button onClick={onClick} variant={"clear"} className={className} tabIndex={tabIndex}>
          <MenuIcon />
        </Button>
      }
    />
  );
};

DropdownMenu.propTypes = {
  placement: PropTypes.string,
};

DropdownMenu.defaultProps = {
  placement: "bottom-start",
};

export default DropdownMenu;
