import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import Input from "../Input";
import { useEventListener } from "usehooks-ts";
import "./Select.css";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  value: string;
  options: Array<SelectOption>;
  onChange: (value: string) => void;
  onFocus: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  className: string;
  disabled?: boolean;
  placeholder: string;
};

const Select = ({
  className,
  disabled,
  options,
  value,
  placeholder,
  onChange,
  onFocus,
  onBlur,
}: SelectProps) => {
  const [focus, setFocus] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const inputRef = React.useRef(null);

  const selectOption = (option: SelectOption) => {
    onChange(option.value);
    setFocus(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur(event);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  React.useEffect(() => {
    setFilter("");
  }, [focus]);

  const filteredOptions = options.filter((option) => {
    return (
      option.label.toLowerCase().includes(filter.toLowerCase()) ||
      option.value.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div
      className={cn("Select", className, {
        ["Select_disabled"]: disabled,
        ["Select_focus"]: focus,
      })}
    >
      <Input
        ref={inputRef}
        className={cn("SelectValue")}
        disabled={disabled}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={
          focus
            ? filter
            : value
            ? options.find((option) => option.value === value)?.label
            : placeholder
        }
        onChange={handleFilter}
      />

      <span
        onClick={() => inputRef.current.focus()}
        className={cn("SelectIcon")}
      >
        {">"}
      </span>
      <div className={cn("SelectOptions")}>
        {filteredOptions.map((option) => (
          <div
            key={option.value}
            className={cn("SelectOption", {
              ["SelectOption_disabled"]: option.disabled,
              ["SelectOption_selected"]: option.value === value,
            })}
            onMouseDown={() => selectOption(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  options: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
  }),
};

export default Select;
