import React from "react";
import PropTypes from "prop-types";
import RenderInputField from "./components/InputFields";
import "./styles/index.css";
import MenuOverlay from "./components/MenuOverlay";
import MenuRenderer from "./components/MenuRenderer";
import DefaultHighlightTextRenderer from "./components/DefaultHighlightTextRenderer";
import {
  getOptionByLabel,
  getOptionLabel,
  findItem,
  keyCodes,
  filterOptions,
  noop
} from "./utils/";

/**
 The Typeahead component.
 @since 0.0.0
 @status EXPERIMENTAL
 */
class Typeahead extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getState(props.selectedValue);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleOutsideClick);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedValue !== nextProps.selectedValue) {
      this.setState(this.getState(nextProps.selectedValue));
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }
  /**
   *
   *  Get state by processing props
   * @param {any} selectedValue
   * @returns {object} state object
   */
  getState = selectedValue => {
    const { labelKey, autoFocus } = this.props;
    const value = getOptionLabel(selectedValue, labelKey) || "";
    return {
      searchText: "",
      frontInputValue: value,
      backInputValue: value,
      isMenuOpened: false,
      activeIndex: -1,
      selectedValue,
      isFocused: autoFocus,
    };
  };
  /**
   *
   * Get input element reference
   * @param {any} e
   */
  getInputRef = e => {
    if (!this.inputRef) {
      this.inputRef = e;
    }
  };
  /**
   *
   * Highlight option based on index
   * @param {Number} activeIndex
   * @param {Array<Object>} results
   */
  handleItemHighlight = (activeIndex, results) => {
    const { searchText } = this.state;
    const { labelKey } = this.props;
    let frontInputValue;
    let backInputValue;

    if (activeIndex === -1) {
      frontInputValue = searchText;
      backInputValue = findItem(results, searchText, labelKey);
    } else if (results[activeIndex]) {
      const t = getOptionLabel(results[activeIndex], labelKey);
      frontInputValue = t;
      backInputValue = t;
    }

    this.setState({
      activeIndex,
      frontInputValue,
      backInputValue
    });
  };
  /**
   *
   * Input onChange event handler
   * @param {any} e
   */
  handleChange = e => {
    const { value } = e.target;
    const { options, labelKey } = this.props;
    const selectedValue = value.length ? this.state.selectedValue : null;
    let backInputValue = "";

    if (value.length) {
      backInputValue = findItem(options, value, labelKey);
    }

    this.setState({
      searchText: value,
      frontInputValue: value,
      backInputValue,
      activeIndex: -1,
      isMenuOpened: true,
      selectedValue
    });
  };
  /**
   *
   * Input element onKeyDown handler
   * @param {Object} e
   * @param {Array<Object>} results
   * @param {Boolean} isMenuOpened
   */
  handleKeyDown = (e, results, isMenuOpened) => {
    const { keyCode } = e;
    const { backInputValue } = this.state;
    let { activeIndex } = this.state;

    switch (keyCode) {
      case keyCodes.UP:
      case keyCodes.DOWN: {
        if (!isMenuOpened) {
          this.showMenu(e);
          break;
        }
        if (keyCode === keyCodes.UP) {
          // Prevent setting cursor to start of the input
          e.preventDefault();
          activeIndex -= 1;
        } else {
          activeIndex += 1;
        }

        // Check boundaries
        if (activeIndex < -1) {
          activeIndex = results.length - 1;
        } else if (activeIndex >= results.length) {
          activeIndex = -1;
        }

        this.handleItemHighlight(activeIndex, results);
        break;
      }
      case keyCodes.RIGHT: {
        // RIGHT ARROW
        if (backInputValue.length) {
          const selectedValue = getOptionByLabel(
            results,
            backInputValue,
            this.props.labelKey
          );
          this.handleItemSelected(e, results, selectedValue);
        }
        break;
      }
      case keyCodes.ESC: {
        // esc
        this.handleMenuHidden();
        break;
      }
      case keyCodes.ENTER: {
        // enter
        if (isMenuOpened && activeIndex !== -1) {
          this.handleItemSelected(e, results);
        } else {
          this.hideMenu(e);
          this.inputRef.blur();
        }
        break;
      }
      case keyCodes.TAB: {
        // TAB
        if (backInputValue.length) {
          this.handleItemSelected(e, results);
        }
        // prevent event propagation
        // e.preventDefault()
        this.hideMenu(e);
        break;
      }
      default:
        break;
    }
  };
  /**
   *
   * Input element onFocus handler
   * @param {Object} e
   */
  handleFocus = e => {
    const { searchText, selectedValue } = this.state;
    if (selectedValue || searchText) {
      this.showMenu(e);
    }
    this.setState({
      isFocused: true
    });
  };
  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  };
  /**
   *
   * Set selected option handler
   * @param {Object} e
   * @param {Array<Object>} results
   */
  handleItemSelected = (e, results, selectedItem) => {
    const { backInputValue } = this.state;
    const { labelKey } = this.props;
    let selectedValue;
    const triggerCb =
      [keyCodes.ENTER, keyCodes.TAB, keyCodes.RIGHT].indexOf(e.keyCode) !== -1;

    if (selectedItem) {
      selectedValue = selectedItem;
    } else {
      selectedValue = getOptionByLabel(results, backInputValue, labelKey);
    }

    // Update input value
    const inputValue = getOptionLabel(selectedValue, labelKey);
    this.setState({
      searchText: "",
      isMenuOpened: false,
      backInputValue: triggerCb ? "" : inputValue,
      frontInputValue: inputValue,
      selectedValue
    });
    // remove focus from input
    this.inputRef.blur();
    // if key storke is enter or tab, call callback fun
    if (
      typeof this.props.onSelected === "function" &&
      (triggerCb || selectedItem)
    ) {
      this.props.onSelected(e, selectedValue);
    }
  };
  /**
   *
   * Set requried state before closing option overlay
   */
  handleMenuHidden = () => {
    const { selectedValue, searchText } = this.state;
    const { labelKey } = this.props;
    this.setState({
      isMenuOpened: false,
      activeIndex: -1,
      backInputValue: "",
      frontInputValue: selectedValue
        ? getOptionLabel(selectedValue, labelKey)
        : searchText
    });
  };
  /**
   *
   * Docuemnt outside click handler
   * @param {Object} event
   */
  handleOutsideClick = event => {
    if (this.target && !this.target.contains(event.target)) {
      this.handleMenuHidden();
      this.hideMenu();
    }
  };
  /**
   *
   * Hide menu
   * @param {object} e
   */
  hideMenu = e => {
    this.setState(() => ({
      isMenuOpened: false
    }));
    if (typeof this.props.onHide === "function") {
      this.props.onHide(e, this.state.selectedValue);
    }
  };
  /**
   *
   * Show menu
   * @param {any} e
   */
  showMenu = e => {
    this.setState(() => ({
      isMenuOpened: true
    }));
    if (typeof this.props.onOpen === "function") {
      this.props.onOpen(e, this.state.selectedValue);
    }
  };
  /**
   *
   *
   * @param {string} selectedValue
   * @param {string} searchText
   * @returns {array} Filtered array
   */
  handleSeachFiltering = (selectedValue, searchText) => {
    const { options, labelKey } = this.props;

    if (selectedValue || searchText.length) {
      return options.filter(option =>
        filterOptions(
          option,
          searchText || getOptionLabel(selectedValue, labelKey),
          labelKey
        )
      );
    }
    return options.slice();
  };
  render() {
    const {
      isMenuOpened,
      frontInputValue,
      backInputValue,
      searchText,
      selectedValue,
      isFocused
    } = this.state;
    const { noResultsMessage, attachToBody, disabled } = this.props;
    // Filter options
    const results = this.handleSeachFiltering(selectedValue, searchText);
    const classes = ["typeahead-wrapper"];
    if (disabled) {
      classes.push("is-disabled");
    }
    if (isFocused) {
      classes.push("is-focused");
    }
    return (
      <div
        ref={node => {
          this.target = node;
        }}
        className={classes.join(" ")}
      >
        <RenderInputField
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
          onKeyDown={e => {
            this.handleKeyDown(e, results, isMenuOpened);
          }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          frontInputValue={frontInputValue}
          backInputValue={backInputValue}
          autoFocus={this.props.autoFocus}
          inputRef={this.getInputRef}
          disabled={this.props.disabled}
        />
        {isMenuOpened ? (
          <MenuOverlay target={attachToBody ? null : this.target}>
            <MenuRenderer
              searchText={searchText}
              labelKey={this.props.labelKey}
              items={results}
              activeIndex={this.state.activeIndex}
              onItemSelected={(e, position) => {
                this.handleItemSelected(e, results, results[position]);
              }}
              noResultsMessage={noResultsMessage}
              renderItem={this.props.renderItem}
              attachToBody={attachToBody}
            />
          </MenuOverlay>
        ) : null}
      </div>
    );
  }
}

Typeahead.propTypes = {
  /**
   * Focus input element
   */
  autoFocus: PropTypes.bool,
  /**
   * Append option popup to body
   */
  attachToBody: PropTypes.bool,
  /**
   * Disable input component
   */
  disabled: PropTypes.bool,
  /**
   * label key is object propert name
   */
  labelKey: PropTypes.string,
  /**
   * callback will be triggered when menu hidden
   */
  onHide: PropTypes.func,
  /**
   * callback will be triggered when option selected
   */
  onSelected: PropTypes.func,
  /**
   * callback will be triggered when menu opened
   */
  onOpen: PropTypes.func,
  /**
   * menu values array of objects/ strings
   */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string)
  ]),
  /**
   * placeholder
   */
  placeholder: PropTypes.string,
  /**
   * Custom way of rendering like menu option with icons
   */
  renderItem: PropTypes.func,
  /**
   * set default value either string or object
   */
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /**
   * message to be shown when no results found
   */
  noResultsMessage: PropTypes.string
};

Typeahead.defaultProps = {
  labelKey: "name",
  disabled: false,
  placeholder: "Search..",
  options: [],
  attachToBody: false,
  noResultsMessage: "No results found.",
  renderItem: DefaultHighlightTextRenderer,
  selectedValue: null,
  autoFocus: false,
  onHide: noop,
  onSelected: noop,
  onOpen: noop
};

export default Typeahead;
