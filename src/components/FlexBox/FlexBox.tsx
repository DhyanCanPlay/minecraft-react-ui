import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./FlexBox.css";

type FlexBoxProps = {
  direction: "row" | "col";
  align: "flex-start" | "flex-end" | "center" | "stretch";
  justify:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  wrap: "wrap" | "nowrap";
  className?: string;
  children: React.ReactNode;
};

const FlexBox = ({
  direction,
  align,
  justify,
  className,
  children,
}: FlexBoxProps) => {
  return (
    <div
      className={cn("FlexBox", className, {
        [`FlexBox_${direction}`]: true,
        [`FlexBox_justify_${justify}`]: true,
        [`FlexBox_align_${align}`]: true,
        [`FlexBox_${justify}`]: true,
      })}
    >
      {children}
    </div>
  );
};

FlexBox.propTypes = {
  direction: PropTypes.oneOf(["row", "col"]),
  align: PropTypes.oneOf(["flex-start", "flex-end", "center"]),
  justify: PropTypes.oneOf(["flex-start", "flex-end", "center"]),
  wrap: PropTypes.oneOf(["wrap", "nowrap"]),
  children: PropTypes.node,
};

FlexBox.defaultProps = {
  direction: "row",
  align: "flex-start",
  justify: "flex-start",
  wrap: "nowrap",
};

export default FlexBox;
