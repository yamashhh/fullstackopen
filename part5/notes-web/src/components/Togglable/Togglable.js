import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    setIsVisible((previous) => !previous);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return isVisible ? (
    <div data-testid="togglableContent">
      {props.children}
      <button
        data-testid="toggleButton"
        onClick={toggleVisibility}
        style={{ display: "block" }}
      >
        cancel
      </button>
    </div>
  ) : (
    <div data-testid="togglableContent">
      <button
        data-testid="toggleButton"
        onClick={toggleVisibility}
        style={{ display: "block" }}
      >
        {props.buttonLabel}
      </button>
    </div>
  );
});

export default Togglable;
