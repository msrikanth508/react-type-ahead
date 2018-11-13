import React from 'react';
import PropTypes from 'prop-types';

// This component will be used to highlight search text in options
const HighlightTextRenderer = ({ searchText, value }) => {
  if (!value && !searchText) return null;
  const matchIndex = value.toLowerCase().indexOf(searchText.toLowerCase());

  if (matchIndex < 0) return value;

  const preHighlightText = value.substr(0, matchIndex);
  const highlightText = value.substr(matchIndex, searchText.length);
  const postHighlightText = value.substr(matchIndex + searchText.length);

  // construct element based on occurance and non-occurance strings
  return (
    <span>
      {preHighlightText}
      <strong>{highlightText}</strong>
      {postHighlightText}
    </span>
  );
};

HighlightTextRenderer.propTypes = {
  /** Search text */
  searchText: PropTypes.string,
  /** Actual option value */
  value: PropTypes.string,
};

HighlightTextRenderer.defaultProps = {
  searchText: '',
  value: '',
};

export default HighlightTextRenderer;
