/* eslint react/no-find-dom-node: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Portal extends React.Component {
  // componentWillMount() {
  //   if (!ReactDOM.findDOMNode(this.props.target)) {}
  // }

  componentDidMount() {
    if (!this.target) {
      this.target = ReactDOM.findDOMNode(this.props.target || document.body);
      this.forceUpdate();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.target !== this.props.target) {
      this.target = ReactDOM.findDOMNode(this.props.target || document.body);
    }
  }

  componentWillUnmount() {
    this.target = null;
  }
  render() {
    const { children } = this.props;
    if (this.target && children) {
      return ReactDOM.createPortal(children, this.target);
    }
    return null;
  }
}

Portal.propTypes = {
  target: PropTypes.instanceOf(HTMLElement), // eslint-disable-line no-undef
  children: PropTypes.element,
};


Portal.defaultProps = {
  target: '',
  children: '',
};

export default Portal;
