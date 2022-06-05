import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem, { ListItemProps } from "./ListItem";
import { MenuItemProps } from "../Menu";
import ListOptions from "./ListOptions";
import { ListContextProvider } from "./ListContext";
import "./List.css";

export type ListProps = {
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
  initialFilter: string;
  draggable?: boolean;
  estimatedItemSize?: number;
  itemSize?: number;
  innerRef: (ref: any) => void;
};

type DragDropItemProps = ListItemProps & {
  provided?: any;
  isDragging?: boolean;
};

const DragDropItem = ({
  provided,
  item,
  style,
  index,
  isDragging,
  className,
  ...rest
}: DragDropItemProps) => {
  return (
    <ListItem
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      item={item}
      index={index}
      style={{
        ...style,
        ...provided.draggableProps.style,
      }}
      className={cn(className, "DragDropItem", {
        [`DragDropItem_dragging`]: isDragging,
      })}
      {...rest}
    />
  );
};

const DragDropListItem = React.memo(
  (
    props: DragDropItemProps & {
      data: {
        items: Array<ListItemProps["item"]>;
        draggable: boolean;
      };
    }
  ) => {
    const {
      index,
      data: { items, draggable },
      style,
    } = props;
    return (
      <Draggable
        isDragDisabled={!draggable}
        draggableId={items[index].id}
        index={index}
        key={items[index].id}
      >
        {(provided, snapshot) => {
          return (
            <DragDropItem
              {...props}
              provided={provided}
              isDragging={snapshot.isDragging}
              item={items[index]}
              index={index}
              style={style}
            />
          );
        }}
      </Draggable>
    );
  },
  areEqual
);

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      renderItem,
      items,
      itemDisabled,
      itemOptions,
      initialSelectedIds,
      direction,
      selectable,
      filterable = true,
      itemFilter,
      initialFilter,
      draggable,
      estimatedItemSize,
      itemSize,
      innerRef,
      ...rest
    },
    ref
  ) => {
    const [localItems, setLocalItems] =
      React.useState<ListProps["items"]>(items);

    const handleDropEnd = (result) => {
      const {
        source: { index: sourceIndex },
        destination,
      } = result;

      if (destination && sourceIndex !== destination.index) {
        setLocalItems(([...localItems]) => {
          const [removed] = localItems.splice(sourceIndex, 1);
          localItems.splice(destination.index, 0, removed);
          return localItems;
        });
      }
    };

    const [keywords, setKeywords] = React.useState<string>(initialFilter);

    const filteredItems = filterable
      ? localItems.filter((item) => itemFilter(item, keywords))
      : localItems;

    return (
      <ListContextProvider
        items={filteredItems}
        filteredItems={filteredItems}
        selectable={selectable}
        initialSelectedIds={initialSelectedIds}
        itemDisabled={itemDisabled}
        itemOptions={itemOptions}
        renderItem={renderItem}
      >
        <DragDropContext onDragEnd={handleDropEnd}>
          <Droppable
            droppableId={"List"}
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
              <DragDropItem
                provided={provided}
                isDragging={snapshot.isDragging}
                item={localItems[rubric.source.index]}
                index={rubric.source.index}
              />
            )}
          >
            {(dropProvided) => {
              return (
                <div className="List">
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
                  <div className="ListWrapper">
                    <AutoSizer>
                      {({ width, height }) => (
                        <FixedSizeList
                          outerRef={dropProvided.innerRef}
                          height={height}
                          width={width}
                          itemCount={localItems.length}
                          itemSize={48}
                          itemData={{ items: localItems, draggable }}
                        >
                          {DragDropListItem}
                        </FixedSizeList>
                      )}
                    </AutoSizer>
                  </div>
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </ListContextProvider>
    );
  }
);

List.propTypes = {
  className: PropTypes.string,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemDisabled: PropTypes.func,
  initialSelectedIds: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  selectable: PropTypes.bool,
  direction: PropTypes.oneOf(["column", "row"]),
  ListItem: PropTypes.any,
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
  itemSize: 48,
  initialFilter: "",
};

export default List;
