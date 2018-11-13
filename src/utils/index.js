/* eslint no-console:0 */
const keyCodes = {
  ENTER: 13,
  UP: 38,
  DOWN: 40,
  RIGHT: 39,
  ESC: 27,
  TAB: 9
};

const isObject = obj =>
  Object.prototype.toString.call(obj) === "[object Object]";
const noop = () => undefined;

/**
 *
 * getOptionLabel
 * @param {object} option
 * @param {string} labelKey
 * @returns {bool}
 */
const getOptionLabel = (option, labelKey) =>
  isObject(option) ? option[labelKey] : option;
/**
 *
 * case insensitive strings comparision
 * @param {string} srcStr
 * @param {string} destStr
 * @returns {bool}
 */
const caseInsensitiveEquals = (srcStr, destStr) => {
  try {
    return srcStr.toLowerCase() === destStr.toLowerCase();
  } catch (e) {
    console.error("Expecting string instead received different kind");
    return false;
  }
};
/**
 *
 * getOptionByLabel
 * @param {Array} options
 * @param {string} label
 * @param {string} labelKey
 * @returns {object}
 */
const getOptionByLabel = (options, label, labelKey) =>
  options.find(item =>
    caseInsensitiveEquals(getOptionLabel(item, labelKey), label)
  );
/**
 *
 * Find given match from options array to show it as suggestion
 * ex, if user types aF, after finding object from options list (match is Afghanistan)
 * we should honor user typed string aF and suggestion string would aFghanistan
 * instead of Afghanistan
 * @param {Array} items
 * @param {string} match
 * @param {string} labelKey
 * @returns {string} a matched string from options list
 */
const findItem = (items, match, labelKey) => {
  if (match) {
    try {
      const t = items.find(item =>
        caseInsensitiveEquals(
          getOptionLabel(item, labelKey).substr(0, match.length),
          match
        )
      );
      if (t) return match + getOptionLabel(t, labelKey).substr(match.length);
    } catch (e) {
      console.error("Expecting string instead received different kind");
      return "";
    }
  }
  return "";
};
/**
 *
 * isMatchOccured
 * @param {string} searchText
 * @param {string} value
 * @returns {bool}
 */
const isMatchOccured = (searchText, value) => {
  try {
    return value.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
  } catch (e) {
    console.error("Expecting string instead received different kind");
    return false;
  }
};

/**
 *
 * Filter options based on search text
 * @param {any} option
 * @param {string} searchText
 * @param {string} labelKey
 * @returns {array} filtered options
 */
const filterOptions = (option, searchText, labelKey) => {
  // TODO: support filtering on additional properties
  try {
    return [labelKey].some(field =>
      isMatchOccured(searchText, getOptionLabel(option, field))
    );
  } catch (e) {
    return [];
  }
};

/**
 * scrollToView polyfill for non-supporting browsers
 * Taken polyfill from https://gist.github.com/hsablonniere/2581101
 * @param {Element} node
 */
const scrollIntoViewIfNeeded = node => {
  // Webkit browsers
  if (node) {
    if (Element.prototype.scrollIntoViewIfNeeded) {
      node.scrollIntoViewIfNeeded();
    } else if (node.parentNode) {
      const parent = node.parentNode, // eslint-disable-line one-var
        parentComputedStyle = window.getComputedStyle(parent, null),
        parentBorderTopWidth = parseInt(
          parentComputedStyle.getPropertyValue("border-top-width"),
          10
        ),
        overTop = node.offsetTop - parent.offsetTop < parent.scrollTop,
        overBottom =
          node.offsetTop -
            parent.offsetTop +
            node.clientHeight -
            parentBorderTopWidth >
          parent.scrollTop + parent.clientHeight;

      if (overTop || overBottom) {
        parent.scrollTop =
          node.offsetTop -
          parent.offsetTop -
          parent.clientHeight / 2 -
          parentBorderTopWidth +
          node.clientHeight / 2;
      }
    }
  }
};

export {
  getOptionByLabel,
  getOptionLabel,
  caseInsensitiveEquals,
  findItem,
  keyCodes,
  filterOptions,
  noop,
  scrollIntoViewIfNeeded
};
