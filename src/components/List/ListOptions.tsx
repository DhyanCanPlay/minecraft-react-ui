import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import DropdownMenu from "../DropdownMenu";
import Checkbox from "../inputs/Checkbox";
import Input from "../inputs/Input";
import { useListContext } from "./ListContext";
import "./ListOptions.css";

const ListSelectAll = () => {
  const { selection, items } = useListContext();
  if (selection) {
    const { selectedIds, setSelectedIds } = selection;
    const allSelected = items.every(({ id }) =>
      selection.selectedIds.includes(id)
    );
    const someSelected =
      !allSelected && items.some(({ id }) => selectedIds.includes(id));

    return (
      <label className={cn("SelectAll")}>
        <Checkbox
          onChange={() => {
            if (allSelected) {
              setSelectedIds([]);
            } else {
              setSelectedIds(items.map(({ id }) => id));
            }
          }}
          value={allSelected}
          indeterminate={someSelected}
        />
        <span className={"SelectAllCheckbox"}>
          {!selection.selectedIds?.length
            ? "Select all"
            : `Selected ${selection.selectedIds.length}`}
        </span>
      </label>
    );
  }
  return null;
};

const ListOptions = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, children, ...rest }, ref) => {
  const { selection, menu, search } = useListContext();

  return (
    <div className={cn("ListOptions", className)} ref={ref}>
      {selection && <ListSelectAll />}

      {children && (
        <div className={cn("ListOptionsContent")} {...rest}>
          {children}
        </div>
      )}
      {search && (
        <Input
          className={cn("ListOptionsFilter")}
          placeholder={"Search items"}
          value={search.keywords}
          onChange={(keywords) => search.onChange(keywords)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            var key = event.key || event.keyCode;
            if ((key === "Enter" && event.shiftKey) || key === "ArrowUp") {
              event.preventDefault();
              search.prev(event);
            } else if (key === "Enter" || key === "ArrowDown") {
              event.preventDefault();
              search.next(event);
            }
          }}
        />
      )}
      {menu && <DropdownMenu items={menu.items()} />}
    </div>
  );
});

ListOptions.propTypes = {
  className: PropTypes.string,
};

export default ListOptions;
