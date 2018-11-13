import React from 'react';
import PropTypes from 'prop-types';
// import styles from './typeahead-styles.css'
import { scrollIntoViewIfNeeded, noop } from '../utils/';

/**
 *
 * This component will be used to render option items
 * @class ItemRenderer
 * @extends {React.Component}
 */
class ItemRenderer extends React.Component {
  state = {
    activeIndex: this.props.activeIndex,
    // position: this.props.position,
  }

  componentDidMount() {
    if (this.state.activeIndex === this.props.position) {
      scrollIntoViewIfNeeded(this.node);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeIndex !== this.state.activeIndex) {
      this.setState({
        activeIndex: nextProps.activeIndex,
      });
      if (nextProps.activeIndex === this.props.position) {
        scrollIntoViewIfNeeded(this.node);
      }
    }
  }

  render() {
    const { position, onClick, className } = this.props;
    const { activeIndex } = this.state;
    const classes = ['typeahead-item'];
    if (className) {
      classes.push(className);
    }
    if (activeIndex > -1 && position === activeIndex) {
      classes.push('active');
    }

    return (
      <div
        onClick={onClick}
        role="presentation"
        className={classes.join(' ')}
        ref={(node) => {
          this.node = node;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

ItemRenderer.propTypes = {
  /** Active index cursor */
  activeIndex: PropTypes.number,
  /** Item index number */
  position: PropTypes.number,
  /** On Selection of item */
  onClick: PropTypes.func,
  /** Custom classname */
  className: PropTypes.string,
  /** Children element */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

ItemRenderer.defaultProps = {
  activeIndex: -1,
  position: -1,
  onClick: noop,
  className: '',
  children: null,
};

export default ItemRenderer;
