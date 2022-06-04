import * as React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useEventListener } from "usehooks-ts";
import Button from "../../Button";
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
  const [isFocus, setFocus] = React.useState(false);
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
    setFocus(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
    setFocus(false);
  };

  const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (isDragging) {
      event.preventDefault();
      setIsDragging(false);
    }
  };

  const relativeValue = ((value - min) / (max - min)) * 100;

  const handleMouseMove = (event) => {
    if (isDragging) {
      const { clientX } = event;
      const { left, width } = sliderRef.current.getBoundingClientRect();
      const relativeX = (clientX - left) / width;
      const newValue = Math.round(relativeX * (max - min)) + min;
      onChange(Math.min(max, Math.max(min, newValue)));
    }
  };
  const handleClick = (event) => {
    const { clientX } = event;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const relativeX = (clientX - left) / width;
    const newValue = Math.round(relativeX * (max - min)) + min;
    onChange(Math.min(max, Math.max(min, newValue)));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      onChange(Math.max(min, value - 1));
    } else if (event.key === "ArrowRight") {
      onChange(Math.min(max, value + 1));
    }
  };

  const backgroundRailStyles = (() => ({
    backgroundImage: `
    linear-gradient(to right, ${
      value === min ? "transparent" : "var(--slider-rail-fill-color)"
    }, ${Array.from(new Array(max - min - 1))
      .map(
        (_, index) =>
          `${
            index + 1 <= value - min
              ? "var(--slider-rail-fill-color)"
              : "transparent"
          } calc(${(100 / (max - min)) * (index + 1)}% - 2px), ` +
          `black calc(${(100 / (max - min)) * (index + 1)}% - 2px), ` +
          `black calc(${(100 / (max - min)) * (index + 1)}% + 2px), ` +
          `${
            index + 2 <= value - min
              ? "var(--slider-rail-fill-color)"
              : "transparent"
          } calc(${(100 / (max - min)) * (index + 1)}% + 2px)`
      )
      .join(", ")}, ${
      value === max ? "var(--slider-rail-fill-color)" : "transparent"
    })
`,
  }))();

  useEventListener("mousemove", handleMouseMove);
  useEventListener("mouseup", handleMouseUp);

  return (
    <div
      className={cn("Slider", className, {
        ["Slider_disabled"]: disabled,
        ["Slider_dragging"]: isDragging,
        ["Slider_focus"]: isFocus,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={sliderRef}
        className={cn("SliderRail", className, { Slider_disabled: disabled })}
        style={backgroundRailStyles}
      >
        <Button
          variant={"secondary"}
          disabled={disabled}
          style={{ left: `calc(${relativeValue}% ` }}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
        >
          <span className={cn("SliderTooltip")} style={{ left: "50%" }}>
            <span className={cn("SliderTooltipWrapper")}>{value}</span>
          </span>
        </Button>
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
