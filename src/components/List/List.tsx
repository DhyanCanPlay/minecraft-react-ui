import React, { useEffect } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, areEqual } from "react-window";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ListItem from "./ListItem";
import ListOptions from "./ListOptions";
import { ListContextProvider } from "./ListContext";
import type { Item, ListProps, ListItemProps } from "./types";
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
            index={index}
            item={items[index]}
            dragging={snapshot.isDragging}
            ref={provided.innerRef}
            style={{
              ...style,
              ...provided.draggableProps.style,
            }}
            className={cn({
              [`ListItem_dragging`]: snapshot.isDraggin,
            })}
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
      search,
      draggable,
      itemSize,
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
      setDragging(false);
      if (destination && sourceIndex !== destination.index) {
        setLocalItems(([...localItems]) => {
          const [removed] = localItems.splice(sourceIndex, 1);
          localItems.splice(destination.index, 0, removed);
          return localItems;
        });
      }
    };

    const [dragging, setDragging] = React.useState<boolean>(false);

    const handleDragStart = ({ draggableId }: any) => {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(100);
      }
      setDragging(true);
    };

    const [selectedIds, setSelectedIds] = React.useState<Array<Item["id"]>>(
      selection?.initialSelectedIds || []
    );

    const itemSelected = (item: Item) => {
      return selectedIds.includes(item.id);
    };

    const [keywords, setKeywokds] = React.useState<string>("Item 22");
    const [currentResultItemIndex, setCurrentResultItemIndex] =
      React.useState<number>(-1);

    const listRef = React.useRef<any>(null);

    useEffect(() => {
      if (search) {
        if (!keywords) {
          setCurrentResultItemIndex(-1);
        } else {
          setCurrentResultItemIndex(
            items.findIndex((item) => search.searchItem(item, keywords))
          );
        }
      }
    }, [keywords]);

    const nextResult = () => {
      if (search) {
        const searchResults = items.filter((item) =>
          search.searchItem(item, keywords)
        );
        if (searchResults.length > 1) {
          const nextResultIndex = items.findIndex(
            (item, index) =>
              index > currentResultItemIndex &&
              search.searchItem(item, keywords)
          );
          if (nextResultIndex === -1) {
            setCurrentResultItemIndex(
              items.findIndex((item, index) =>
                search.searchItem(item, keywords)
              )
            );
          } else {
            setCurrentResultItemIndex(nextResultIndex);
          }
        }
      }
    };

    const prevResult = () => {
      if (search) {
        const searchResultIndexes = items.reduce<number[]>(
          (indexes, item, index) => {
            if (search.searchItem(item, keywords)) {
              return [...indexes, index];
            }
            return indexes;
          },
          []
        );
        if (searchResultIndexes.length > 1) {
          const prevResultIndex =
            searchResultIndexes.indexOf(currentResultItemIndex) - 1;
          if (prevResultIndex === -1) {
            setCurrentResultItemIndex(
              searchResultIndexes[searchResultIndexes.length - 1]
            );
          } else {
            setCurrentResultItemIndex(searchResultIndexes[prevResultIndex]);
          }
        }
      }
    };

    useEffect(() => {
      if (currentResultItemIndex > -1) {
        listRef.current.scrollToItem(currentResultItemIndex, "center");
      }
    }, [currentResultItemIndex]);

    return (
      <ListContextProvider
        value={{
          items,
          menu,
          renderItem,
          search: search && {
            ...search,
            keywords,
            onChange: setKeywokds,
            next: nextResult,
            prev: prevResult,
            currentResultItemIndex,
          },
          selection: selection && {
            ...selection,
            selectedIds,
            setSelectedIds,
            itemSelected,
          },
        }}
      >
        <DragDropContext
          onDragStart={handleDragStart}
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
                dragging={snapshot.isDragging}
                item={localItems[rubric.source.index]}
                index={rubric.source.index}
              />
            )}
          >
            {(dropProvided: any) => {
              return (
                <div className={cn("ListContainer", className)}>
                  <ListOptions />
                  <AutoSizer className="ListAutoSizer">
                    {({ width, height }: AutoSizerProps) => (
                      <FixedSizeList
                        className={cn("List", className, "List_dragging")}
                        ref={listRef}
                        outerRef={dropProvided.innerRef}
                        height={height}
                        width={width}
                        itemCount={localItems.length}
                        innerElementType={"ul"}
                        itemSize={itemSize}
                        itemData={{ items: localItems, draggable }}
                      >
                        {DragDropListItem}
                      </FixedSizeList>
                    )}
                  </AutoSizer>
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
