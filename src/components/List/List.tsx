import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Checkbox from "../Checkbox";
import ListItem, { ListItemProps, ListItemSelectionProps } from "./ListItem";
import { MenuItemProps } from "../Menu";
import "./List.css";

interface Item {
  id: string;
  [key: string]: any;
}

type RenderItemProps = {
  item: Item;
  selection: ListItemSelectionProps;
  options: Array<MenuItemProps>;
};

type ListProps = {
  className?: string;
  children?: React.ReactNode;
  items: Array<Item>;
  ListItem?: React.ComponentType<ListItemProps>;
  renderItem: (renderItemProps: RenderItemProps) => React.ReactNode;
  initialSelectedIds?: string[];
  itemDisabled?: (item: Item) => boolean;
  itemOptions?: (item: Item) => Array<MenuItemProps>;
  selectable?: boolean;
  direction?: "row" | "column";
};

const List = ({
  className,
  renderItem,
  items,
  itemDisabled,
  itemOptions,
  ListItem: ListItemComponent,
  initialSelectedIds,
  direction,
  selectable,
}: ListProps) => {
  const [selectedIds, setSelectedIds] =
    React.useState<string[]>(initialSelectedIds);

  const itemSelected = (item) => {
    return selectedIds.includes(item.id);
  };

  const toggle = (item: Item) => {
    if (itemSelected(item)) {
      setSelectedIds((selectedIds) => [
        ...selectedIds.filter((id) => id !== item.id),
      ]);
    } else {
      setSelectedIds((selectedIds) => [...selectedIds, item.id]);
    }
  };
  return (
    <ul className={cn("List", className, { [`List_${direction}`]: true })}>
      {items.map((item) => {
        const selection = selectable
          ? ({
              toggle: () => toggle(item),
              disabled: itemDisabled(item),
              selected: itemSelected(item),
              selectedIds,
              checkbox: (
                <Checkbox
                  onChange={() => toggle(item)}
                  value={itemSelected(item)}
                />
              ),
            } as ListItemSelectionProps)
          : null;
        return (
          <ListItemComponent
            key={item.id}
            selection={selection}
            options={itemOptions(item)}
          >
            {renderItem({
              item,
              selection,
              options: itemOptions(item),
            })}
          </ListItemComponent>
        );
      })}
    </ul>
  );
};

List.propTypes = {
  className: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemDisabled: PropTypes.func,
  initialSelectedIds: PropTypes.arrayOf(PropTypes.string),
  selectable: PropTypes.bool,
  direction: PropTypes.oneOf(["column", "row"]),
  ListItem: PropTypes.elementType,
};

List.defaultProps = {
  initialSelectedIds: [],
  renderItem: ({ item }) => <div>{item.id}</div>,
  itemDisabled: () => false,
  itemOptions: () => null,
  direction: "column",
  ListItem,
};

export default List;
