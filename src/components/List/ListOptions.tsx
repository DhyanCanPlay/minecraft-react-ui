import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import DropdownMenu from "../DropdownMenu";
import Checkbox from "../inputs/Checkbox";
import Input from "../inputs/Input";
import { MenuItemProps } from "../Menu";
import { useListContext } from "./ListContext";
import "./ListOptions.css";

export type ListOptions = React.HTMLProps<HTMLDivElement> & {
  className?: string;
  options?: Array<MenuItemProps>;
  filter?: {
    [key: string]: any;
  };
  onFilter: (filter: { [key: string]: any }) => void;
};

const ListOptions = React.forwardRef<HTMLDivElement, ListOptions>(
  ({ className, options, filter, onFilter, children, ...rest }, ref) => {
    const { selectedIds, setSelectedIds, items } = useListContext();
    const noneSelected = !selectedIds?.length;
    const allSelected = items.every(({ id }) => selectedIds.includes(id));
    const someSelected =
      !allSelected && items.some(({ id }) => selectedIds.includes(id));
    return (
      <div className={cn("ListOptions", className)} ref={ref}>
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
            {noneSelected ? "Select all" : `Selected ${selectedIds.length}`}
          </span>
        </label>

        {children && (
          <div className={cn("ListOptionsContent")} {...rest}>
            {children}
          </div>
        )}
        {filter && (
          <Input
            className={cn("ListOptionsFilter")}
            placeholder={"Search items"}
            value={filter.keywords}
            onChange={(keywords) => onFilter({ ...filter, keywords })}
          />
        )}
        <DropdownMenu items={options} />
      </div>
    );
  }
);

ListOptions.propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
};

export default ListOptions;
