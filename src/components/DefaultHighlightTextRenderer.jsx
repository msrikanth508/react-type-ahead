import React from "react";
import PropTypes from "prop-types";
import HighlightTextRenderer from "./HighlightTextRenderer";
import { getOptionLabel } from "../utils/";

const DefaultHighlightTextRenderer = (option, props) => (
  <HighlightTextRenderer
    searchText={props.searchText}
    value={getOptionLabel(option, props.labelKey)}
  />
);

DefaultHighlightTextRenderer.propTypes = {
  /** Option */
  // option: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  /** search text */
  searchText: PropTypes.string,
  /** label key */
  labelKey: PropTypes.string
};

DefaultHighlightTextRenderer.defaultProps = {
  searchText: "",
  labelKey: ""
};

export default DefaultHighlightTextRenderer;
