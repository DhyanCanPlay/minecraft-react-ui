import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import "./Tag.css";

type TagProps = {
  className?: string;
  children: React.ReactNode;
};

const Tag = ({ className, children }: TagProps) => {
  return <span className={cn("Tag", className, {})}>{children}</span>;
};

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

Tag.defaultProps = {};

export default Tag;
