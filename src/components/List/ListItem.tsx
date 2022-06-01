import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./ListItem.css";
import DropdownMenu, { DropdownMenuProps } from "../DropdownMenu";

export type ListItemSelectionProps = {
  toggle: (id: string) => void;
  selected: boolean;
  selectedIds: string[];
  disabled: boolean;
  checkbox: React.ReactNode;
};

export type ListItemProps = {
  children: React.ReactNode;
  selection: ListItemSelectionProps;
  options: DropdownMenuProps["items"];
};

const ListItem = ({ children, selection, options }: ListItemProps) => {
  const selectionEnable = selection && selection.selectedIds.length > 0;
  return (
    <li
      className={cn("ListItem", {
        ["ListItem_selection"]: selectionEnable,
      })}
    >
      {selection && selection.checkbox}
      <div className={cn("ListItemContent")}>{children}</div>
      {options && <DropdownMenu placement="bottom-end" items={options} />}
    </li>
  );
};

ListItem.propTypes = {
  children: PropTypes.node,
  selection: PropTypes.shape({
    toggle: PropTypes.func,
    selected: PropTypes.bool,
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool,
    checkbox: PropTypes.node,
  }),
};

export default ListItem;
