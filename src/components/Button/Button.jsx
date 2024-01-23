import React from "react";
import PropTypes from "prop-types";
// styles
import "./Button.scss";

const Button = ({ onClick, children, type, isDisabled }) => {
  return (
    <button
      className={`button ${type}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isDisabled: PropTypes.bool,
  type: PropTypes.oneOf(["success", "error", "warning"]),
};

export default Button;
