import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import cn from "classnames";
import "./Dropdown.css";

export type DropdownProps = {
  content: React.ReactNode;
  children: any;
  /**
   * If true, Dropdown closes by clicking on the content.
   */
  closeOnClickContent?: boolean;

  /**
   * If true, Dropdown closes by clicking outside the content.
   */
  closeOnClickOutside?: boolean;

  placement?: Placement;
};

const Dropdown = ({
  content,
  children,
  placement,
  closeOnClickContent,
  closeOnClickOutside,
}: DropdownProps) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [referenceElement, setReferenceElement] =
    React.useState<React.LegacyRef<HTMLDivElement> | undefined>(null);
  const [popperElement, setPopperElement] =
    React.useState<React.LegacyRef<HTMLDivElement> | undefined>(null);

  const instance = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [],
  });
  const { styles, attributes } = instance;

  const handleMouseDown = (event: React.MouseEvent) => {
    setVisible(!visible);
  };

  const handleClickOnContent = (event: React.MouseEvent) => {
    if (closeOnClickContent) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (visible) {
      const handler = (event) => {
        if (
          closeOnClickOutside &&
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
  }, [visible, referenceElement, popperElement]);

  return (
    <>
      {typeof children === "function"
        ? children({
            ref: setReferenceElement,
            open: () => setVisible(true),
            close: () => setVisible(false),
            visible,
            className: cn("DropdownTarget", {
              ["DropdownTarget_visible"]: visible,
            }),
          })
        : React.cloneElement(children, {
            ref: setReferenceElement,
            onClick: handleMouseDown,
            active: visible,
            className: cn("DropdownTarget", children.props.className, {
              ["DropdownTarget_visible"]: visible,
            }),
          })}
      {visible &&
        ReactDOM.createPortal(
          <div
            ref={setPopperElement}
            style={{
              ...styles.popper,
              minWidth: `${instance?.state?.elements?.reference?.offsetWidth}px`,
            }}
            className={cn("Dropdown", {
              ["Dropdown_visible"]: visible,
            })}
            onClick={handleClickOnContent}
            {...attributes.popper}
          >
            {content}
          </div>,
          document.querySelector("body")
        )}
    </>
  );
};

Dropdown.propTypes = {
  content: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  placement: PropTypes.string,
  closeOnClickContent: PropTypes.bool,
  closeOnClickOutside: PropTypes.bool,
};

Dropdown.defaultProps = {
  placement: "bottom-start",
};

export default Dropdown;
