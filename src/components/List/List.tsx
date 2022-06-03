import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { FixedSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import ListItem, { ListItemProps } from "./ListItem";
import { MenuItemProps } from "../Menu";
import ListOptions from "./ListOptions";
import { ListContextProvider } from "./ListContext";
import "./List.css";

type ListProps = {
  className?: string;
  children?: React.ReactNode;
  items: Array<ListItemProps["item"]>;
  ListItem: React.ComponentType<ListItemProps>;
  renderItem: (renderItemProps: {
    item: ListItemProps["item"];
    index: number;
  }) => React.ReactNode;
  initialSelectedIds?: Array<ListItemProps["item"]["id"]>;
  itemDisabled?: (item: ListItemProps["item"]) => boolean;
  itemOptions?: (item: ListItemProps["item"]) => Array<MenuItemProps>;
  filterable: boolean;
  itemFilter?: (item: ListItemProps["item"], search: string) => boolean;
  selectable?: boolean;
  direction?: "row" | "column";
  virtualized?: boolean;
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
  virtualized,
  filterable = true,
  itemFilter,
}: ListProps) => {
  const [keywords, setKeywords] = React.useState<string>("Item");
  const filteredItems = filterable
    ? items.filter((item) => itemFilter(item, keywords))
    : items;

  if (virtualized) {
    return (
      <ListContextProvider
        items={filteredItems}
        filteredItems={filteredItems}
        selectable={selectable}
        initialSelectedIds={initialSelectedIds}
        itemDisabled={itemDisabled}
        itemOptions={itemOptions}
      >
        <ListOptions
          options={[
            {
              id: "select-all",
              label: "Select all",
              onClick: () => {},
            },
          ]}
          filter={{
            keywords,
          }}
          onFilter={(filter) => {
            setKeywords(filter.keywords);
          }}
        />
        <AutoSizer>
          {({ height, width }) => {
            return (
              <FixedSizeList
                height={height}
                itemCount={filteredItems.length}
                itemSize={48}
                width={width}
              >
                {({ index, style }) => (
                  <ListItemComponent
                    item={filteredItems[index]}
                    index={index}
                    style={style}
                  >
                    {renderItem({ item: filteredItems[index], index })}
                  </ListItemComponent>
                )}
              </FixedSizeList>
            );
          }}
        </AutoSizer>
      </ListContextProvider>
    );
  }
  return (
    <ul className={cn("List", className, { [`List_${direction}`]: true })}>
      {filteredItems.map((item, index) => (
        <ListItemComponent key={item.id} item={item} index={index}>
          {renderItem({ item, index })}
        </ListItemComponent>
      ))}
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
  initialSelectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  selectable: PropTypes.bool,
  direction: PropTypes.oneOf(["column", "row"]),
  ListItem: PropTypes.elementType,
};

List.defaultProps = {
  initialSelectedIds: [],
  renderItem: ({ item }) => <div>{item.id}</div>,
  itemDisabled: () => false,
  itemOptions: () => null,
  itemFilter: (item, keyword) => {
    const search = (itemPropertyValue) => {
      if (typeof itemPropertyValue === "string") {
        return itemPropertyValue.toLowerCase().includes(keyword.toLowerCase());
      } else if (typeof itemPropertyValue === "object") {
        return Object.values(itemPropertyValue).some(search);
      }
      return false;
    };
    return Object.values(item).some(search);
  },
  selectable: false,
  direction: "row",
  ListItem: ListItem,
};

export default List;
