import React from 'react';
import PropTypes from 'prop-types';
import ItemRender from './ItemRenderer';

// import styles from './typeahead-styles.css';
/**
 *
 * This component will be used to render menu content
 */
const MenuRenderer = (props) => {
  const {
    items, noResultsMessage, attachToBody, activeIndex, onItemSelected, renderItem,
  } = props;
  const classes = ['typeahead-items'];
  if (attachToBody) {
    classes.push('append-to-body');
  }
  return (
    <div className={classes.join(' ')}>
      {items.length ? (
        items.map((option, i) => (
          <ItemRender
            key={i}
            position={i}
            onClick={(e) => {
              onItemSelected(e, i);
            }}
            activeIndex={activeIndex}
          >
            {renderItem(option, props)}
          </ItemRender>
        ))
      ) : (
        <ItemRender className="no-results">{noResultsMessage}</ItemRender>
      )}
    </div>
  );
};

MenuRenderer.propTypes = {
  /** Menu items */
  items: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object),
    PropTypes.arrayOf(PropTypes.string)]).isRequired,
  /** Custom no results found message */
  noResultsMessage: PropTypes.string.isRequired,
  /** Attach to document body */
  attachToBody: PropTypes.bool.isRequired,
  /** Active selected item index */
  activeIndex: PropTypes.number.isRequired,
  /** callback function for item selection */
  onItemSelected: PropTypes.func.isRequired,
  /** Render props to render items in custom fashion  */
  renderItem: PropTypes.func.isRequired,
};

export default MenuRenderer;
