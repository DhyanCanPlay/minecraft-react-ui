import React from "react";
import type {
  Item,
  RenderItemProps,
  ListContextValue,
  ListItemContextValue,
  ListContextProviderProps,
} from "./types";

const ListContext = React.createContext<ListContextValue>({
  items: [],
  renderItem: ({ item }: RenderItemProps) => item.id,
});

export const useListContext = () =>
  React.useContext<ListContextValue>(ListContext);

export const useListItemContext: ({
  item,
  index,
}: RenderItemProps) => ListItemContextValue = ({ item, index }) => {
  const { selection, menu, renderItem } = useListContext();

  const itemMenu = (() => {
    if (menu) {
      return {
        items: menu.items(item),
      };
    }
    return undefined;
  })();

  const itemSelection = (() => {
    if (selection) {
      const { itemSelected, selectedIds, setSelectedIds, itemDisabled } =
        selection;
      const selected = Boolean(itemSelected && itemSelected(item));
      const disabled = Boolean(itemDisabled && itemDisabled(item));
      const toggle = () => {
        setSelectedIds([
          ...selectedIds.filter((id) => id !== item.id),
          ...(selected ? [] : [item.id]),
        ]);
      };
      return {
        selected,
        selectedIds,
        toggle,
        disabled,
      };
    }
    return undefined;
  })();

  return {
    index,
    item,
    renderItem,
    menu: itemMenu,
    selection: itemSelection,
  };
};

export const ListContextProvider = ({
  value,
  children,
}: ListContextProviderProps) => {
  const { selection, filter } = value;

  const [selectedIds, setSelectedIds] = React.useState<Array<Item["id"]>>(
    selection?.initialSelectedIds || []
  );

  const itemSelected = (item: Item) => {
    return selectedIds.includes(item.id);
  };

  const [keywords, setKeywokds] = React.useState<string>(
    (filter && filter.value) || ""
  );

  return (
    <ListContext.Provider
      value={{
        ...value,
        filter: filter && {
          ...filter,
          filterItem: (item, filter) => item.id === filter,
          value: keywords,
          onChange: setKeywokds,
        },
        selection: selection && {
          ...selection,
          selectedIds,
          setSelectedIds,
          itemSelected,
        },
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
