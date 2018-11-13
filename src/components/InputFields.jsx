import React from "react";
import PropTypes from "prop-types";
import { noop } from "../utils/";

// This will be used to render visibile and shadow input fields
const RenderInputFields = ({
  frontInputValue,
  backInputValue,
  inputRef,
  ...restProps
}) => (
  <div className="typeahead">
    <input
      type="text"
      className="main-input"
      value={frontInputValue}
      ref={inputRef}
      {...restProps}
    />
    <input
      type="text"
      className="shadow-input"
      value={backInputValue}
      tabIndex={-1}
    />
  </div>
);

RenderInputFields.propTypes = {
  /** Visible input value */
  frontInputValue: PropTypes.string,
  /** Shadow input value */
  backInputValue: PropTypes.string,
  /** Visibile input ref object */
  inputRef: PropTypes.func
};

RenderInputFields.defaultProps = {
  frontInputValue: "",
  backInputValue: "",
  inputRef: noop
};

export default RenderInputFields;
