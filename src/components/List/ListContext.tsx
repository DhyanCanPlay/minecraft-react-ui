import React from "react";

type Item = {
  id: string | number;
  [key: string]: any;
};

type ListContextValue = {
  items: Array<Item>;
  filteredItems: Array<Item>;
  selectable: boolean;
  itemDisabled?: (item: Item) => boolean;
  itemOptions?: (item: Item) => any[];
  itemSelected?: (item: Item) => boolean;
  renderItem: (renderItemProps: {
    item: Item;
    index: number;
  }) => React.ReactNode;
  selectedIds?: Array<Item["id"]>;
  setSelectedIds?: React.Dispatch<React.SetStateAction<Array<Item["id"]>>>;
};

type ListContextProviderProps = ListContextValue & {
  children: React.ReactNode;
  initialSelectedIds: Array<Item["id"]>;
};

const ListContext = React.createContext<ListContextValue>({
  selectedIds: [],
  filteredItems: [],
  setSelectedIds: () => {},
  items: [],
  itemDisabled: () => false,
  itemSelected: () => false,
  itemOptions: () => [],
  renderItem: ({ item }) => item.id,
  selectable: false,
});

export const useListContext = () =>
  React.useContext<ListContextValue>(ListContext);

export const useListItemContext = (index) => {
  const {
    items,
    selectable,
    selectedIds,
    setSelectedIds,
    itemSelected,
    itemDisabled,
    itemOptions,
    renderItem,
  } = useListContext();

  const item = items[index];

  const selected = itemSelected(item);

  const toggle = (item) => {
    setSelectedIds(
      (selectedIds: Array<Item["id"]>): Array<Item["id"]> => [
        ...selectedIds.filter((id) => id !== item.id),
        ...(itemSelected(item) ? [] : [item.id]),
      ]
    );
  };
  return {
    index,
    item,
    renderItem,
    options: itemOptions(item),
    selection: selectable
      ? {
          selected,
          selectedIds,
          toggle,
          disabled: itemDisabled(item),
        }
      : undefined,
  };
};

export const ListContextProvider = ({
  items,
  filteredItems,
  children,
  selectable,
  initialSelectedIds,
  itemOptions,
  itemDisabled,
  renderItem,
}: ListContextProviderProps) => {
  const [selectedIds, setSelectedIds] =
    React.useState<Array<Item["id"]>>(initialSelectedIds);

  const itemSelected = (item) => {
    return selectedIds.includes(item.id);
  };

  return (
    <ListContext.Provider
      value={{
        filteredItems,
        selectedIds,
        setSelectedIds,
        items,
        selectable,
        itemDisabled,
        itemOptions,
        itemSelected,
        renderItem,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
