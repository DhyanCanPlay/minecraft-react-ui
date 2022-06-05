import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import ListOptions from "./ListOptions";
import { ListContextProvider } from "./ListContext";
import type { ListProps, ListItemProps } from "./types";
import "./List.css";

type AutoSizerProps = {
  width: number;
  height: number;
};

type DragDropItemProps = ListItemProps & {
  provided?: any;
  isDragging?: boolean;
  isScrolling?: boolean;
};

const DragDropListItem = React.memo((props: DragDropItemProps) => {
  const {
    index,
    data: { items, draggable },
    isScrolling,
    style,
  } = props;
  return (
    <Draggable
      isDragDisabled={!draggable || isScrolling}
      draggableId={items[index].id}
      index={index}
      key={items[index].id}
    >
      {(provided: any, snapshot: any) => {
        return (
          <ListItem
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            {...props}
            ref={provided.innerRef}
            style={{
              ...style,
              ...provided.draggableProps.style,
            }}
            className={cn({
              [`ListItem_dragging`]: snapshot.isDraggin,
            })}
            dragging={snapshot.isDragging}
            item={items[index]}
            index={index}
          />
        );
      }}
    </Draggable>
  );
}, areEqual);

const List = React.forwardRef<HTMLUListElement, ListProps>(
  (
    {
      className,
      renderItem,
      items,
      selection,
      menu,
      filter,
      direction,
      draggable,
      itemSize,
      innerRef,
      ...rest
    },
    ref
  ) => {
    const [localItems, setLocalItems] =
      React.useState<ListProps["items"]>(items);

    const handleDropEnd = (result: any) => {
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

    const handleDropStart = (result: any) => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
    };

    return (
      <ListContextProvider
        value={{
          items,
          selection,
          menu,
          filter,
          renderItem,
        }}
      >
        <DragDropContext
          onDragStart={handleDropStart}
          onDragEnd={handleDropEnd}
        >
          <Droppable
            droppableId={"List"}
            mode="virtual"
            renderClone={(provided: any, snapshot: any, rubric: any) => (
              <ListItem
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={cn({
                  [`ListItem_dragging`]: snapshot.isDragging,
                })}
                dragging={snapshot.isDragging}
                item={localItems[rubric.source.index]}
                index={rubric.source.index}
              />
            )}
          >
            {(dropProvided: any) => {
              return (
                <div className="List">
                  <ListOptions />
                  <div className="ListWrapper">
                    <AutoSizer>
                      {({ width, height }: AutoSizerProps) => (
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
  selection: PropTypes.any,
  direction: PropTypes.oneOf(["column", "row"]),
};

List.defaultProps = {
  direction: "row",
  itemSize: 48,
};

export default List;
