import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Checkbox from "../inputs/Checkbox";
import DropdownMenu from "../DropdownMenu";
import { useListItemContext } from "./ListContext";
import type { ListItemProps } from "./types";
import "./ListItem.css";

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, index, className, item, ...rest }, ref) => {
    const { selection, menu, renderItem } = useListItemContext({ item, index });
    const selectionEnable = selection && selection.selectedIds.length > 0;
    const selected = selection && selection.selected;

    const handleClick = () => {
      if (selection && selection.selectedIds.length > 0) {
        selection.toggle();
      }
    };
    return (
      <li
        ref={ref}
        {...rest}
        className={cn("ListItem", className, {
          ["ListItem_selected"]: selected,
          ["ListItem_selection"]: selectionEnable,
        })}
      >
        {selection && (
          <Checkbox
            className={cn("ListItemCheckbox")}
            onChange={() => selection.toggle()}
            value={selection.selected}
          />
        )}
        <div onClick={handleClick} className={cn("ListItemContent")}>
          {renderItem({ item, index })}
        </div>
        {menu && (
          <DropdownMenu
            className={cn("ListItemOptions")}
            onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              event.stopPropagation()
            }
            tabIndex={selection && selection.selectedIds.length > 0 ? -1 : 0}
            placement="bottom-end"
            {...menu}
          />
        )}
      </li>
    );
  }
);

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
