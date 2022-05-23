import React from "react";
import PropTypes from "prop-types";

const Button = ({
  type,
  name,
  classes,
  onClickHandler,
  disabled,
  primary,
  secondary,
  children,
  warning,
}) => {
  const baseClasses =
    "m-2 p-2 rounded-md transition ease-in-out duration-300 shadow-xl block focus:outline-none focus:ring focus:ring-honey-yellow-light";

  const primaryClasses =
    "primary bg-oxford-blue hover:text-honey-yellow text-white";
  const secondaryClasses = "secondary bg-cyan-500 hover:bg-cyan-400 text-white";
  const warningClasses =
    "secondary bg-french-raspberry-light hover:text-honey-yellow text-white";
  let disabledClasses = "bg-slate-200 bg-slate-300 text-white";

  const combine = () => {
    let combined = baseClasses;
    if (classes) {
      combined = combined.concat(" ", classes);
    }
    if (primary) {
      combined = combined.concat(" ", primaryClasses);
    }
    if (secondary) {
      combined = combined.concat(" ", secondaryClasses);
    }
    if (warning) {
      combined = combined.concat(" ", warningClasses);
    }
    if (disabled) {
      combined = combined.concat(" ", disabledClasses);
    }
    return combined;
  };

  return (
    <button
      className={combine()}
      type={type}
      onClick={onClickHandler}
      disabled={disabled ? disabled : false}
    >
      {children}
      {name}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.string,
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
};

export default Button;
