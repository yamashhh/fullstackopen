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
    <>
      {props.children}
      <button onClick={toggleVisibility} style={{ display: "block" }}>
        cancel
      </button>
    </>
  ) : (
    <button onClick={toggleVisibility} style={{ display: "block" }}>
      {props.buttonLabel}
    </button>
  );
});

export default Togglable;
