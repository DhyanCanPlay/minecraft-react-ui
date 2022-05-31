import React, { useEffect, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import cn from "classnames";
import "./Tooltip.css";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  placement?: Placement;
  trigger?: "hover" | "click";
};

const Tooltip = React.forwardRef(
  ({ content, children, placement, trigger }: TooltipProps, ref: any) => {
    const [visible, setVisible] = React.useState<boolean>(false);
    const [referenceElement, setReferenceElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [arrowElement, setArrowElement] = React.useState(null);
    const instance = usePopper(referenceElement, popperElement, {
      placement,
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowElement,
            padding: 0,
          },
        },
      ],
    });
    const { styles, attributes } = instance;

    useImperativeHandle(ref, () => instance);

    const handleMouseEnter = (event: React.MouseEvent) => {
      if (trigger === "hover") {
        setVisible(true);
      }
    };
    const handleMouseLeave = (event: React.MouseEvent) => {
      if (trigger === "hover") {
        setVisible(false);
      }
    };
    const handleMouseDown = (event: React.MouseEvent) => {
      if (trigger === "click") {
        setVisible(!visible);
      }
    };

    useEffect(() => {
      if (visible && trigger === "click") {
        const handler = (event) => {
          if (
            !referenceElement.contains(event.target) &&
            !popperElement.contains(event.target)
          ) {
            setVisible(false);
          }
        };
        document.addEventListener("mousedown", handler);
        return () => {
          document.removeEventListener("mousedown", handler);
        };
      }
    }, [visible, trigger, referenceElement, popperElement]);

    return (
      <>
        <span
          ref={setReferenceElement}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          className={cn("TooltipTarget", { visible })}
        >
          {children}
        </span>
        {visible &&
          ReactDOM.createPortal(
            <div
              ref={setPopperElement}
              style={styles.popper}
              className={cn("Tooltip", {
                ["Tooltip_visible"]: visible,
                [`Tooltip_${placement}`]: true,
              })}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              {...attributes.popper}
            >
              <span
                ref={setArrowElement}
                data-popper-arrow
                style={styles.arrow}
                className={cn("TooltipArrow")}
                {...attributes.arrow}
              />
              <div className={cn("TooltipWrapper")}>{content}</div>
            </div>,
            document.querySelector("body")
          )}
      </>
    );
  }
);

Tooltip.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  trigger: PropTypes.oneOf(["hover", "click"]),
};

Tooltip.defaultProps = {
  placement: "bottom",
  trigger: "hover",
};

export default Tooltip;
