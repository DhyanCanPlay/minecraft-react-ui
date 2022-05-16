import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useEventListener } from "usehooks-ts";
import Button from "../Button";
import "./Slider.css";

export type SliderProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary";
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
};

const Slider = ({
  disabled,
  className,
  value = 50,
  onChange,
  min = 0,
  max = 100,
}: SliderProps) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (isDragging) {
      event.preventDefault();
      setIsDragging(false);
    }
  };

  const relativeValue = (value * 100) / (max - min);

  const handleMouseMove = (event) => {
    if (isDragging) {
      const { clientX } = event;
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const relativeX = (clientX - left) / width;
      const newValue = Math.round(relativeX * (max - min));
      onChange(Math.min(max, Math.max(min, newValue)));
    }
  };
  const handleClick = (event) => {
    const { clientX } = event;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const relativeX = (clientX - left) / width;
    const newValue = Math.round(relativeX * (max - min));
    onChange(Math.min(max, Math.max(min, newValue)));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      onChange(Math.max(min, value - 1));
    } else if (event.key === "ArrowRight") {
      onChange(Math.min(max, value + 1));
    }
  };

  useEventListener("mousemove", handleMouseMove);
  useEventListener("mouseup", handleMouseUp);

  return (
    <div
      className={cn("Slider", className, {
        Slider_disabled: disabled,
        Slider_dragging: isDragging,
      })}
      ref={sliderRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
    >
      <div
        className={cn("SliderRail", className, { Slider_disabled: disabled })}
      >
        <Button
          variant={"primary"}
          disabled={disabled}
          style={{ left: `${relativeValue}%` }}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
};

Slider.defaultProps = {
  variant: "secondary",
  onChange: () => {
    // Do nothing
  },
};

Slider.displayName = "Slider";

export default Slider;
