import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Checkbox from "../inputs/Checkbox";
import DropdownMenu from "../DropdownMenu";
import { useListItemContext } from "./ListContext";
import "./ListItem.css";

type Item = {
  id: string | number;
  [key: string]: any;
};

export type ListItemSelectionProps = {
  toggle: () => void;
  selected: boolean;
  selectedIds: Array<Item["id"]>;
  disabled: boolean;
  checkbox: React.ReactElement;
};

export type ListItemProps = React.HTMLProps<HTMLLIElement> & {
  children: React.ReactNode;
  index: number;
  item: Item;
};

const ListItem = ({ children, index, ...rest }: ListItemProps) => {
  const { item, selection, options, selectable } = useListItemContext(index);
  const selectionEnable = selection && selection.selectedIds.length > 0;
  const selected = selection && selection.selected;

  const handleClick = () => {
    if (selection && selection.selectedIds.length > 0) {
      selection.toggle(item);
    }
  };
  return (
    <li
      className={cn("ListItem", {
        ["ListItem_selected"]: selected,
        ["ListItem_selection"]: selectionEnable,
      })}
      {...rest}
    >
      {selection && (
        <Checkbox
          className={cn("ListItemCheckbox")}
          onChange={() => selection.toggle(item)}
          value={selection.selected}
        />
      )}
      <div onClick={handleClick} className={cn("ListItemContent")}>
        {children}
      </div>
      {options && (
        <DropdownMenu
          className={cn("ListItemOptions")}
          onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            event.stopPropagation()
          }
          tabIndex={selection?.selectedIds.length > 0 ? -1 : undefined}
          placement="bottom-end"
          items={options}
        />
      )}
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
