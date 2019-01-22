import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

const CarouselSlide = (props) => {
  const {
    classes, children, focused, ...rest
  } = props;
  let className = classes.root;
  if (focused) className += ` ${classes.focused}`;
  return (
    <div className={className} {...rest}>
      {React.cloneElement(children, { focused })}
    </div>
  );
};

CarouselSlide.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  focused: PropTypes.bool,
};

CarouselSlide.defaultProps = {
  focused: false,
}

export const size = 70;
export const stickness = 70;
export const margin = ((-3 * size) + (2 * stickness) + 100) / 4;

const styles = () => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
    width: `${size}%`,
    margin: `0 ${margin}%`,
    opacity: 0.5,
    transition: 'padding,box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 9,
    padding: '5%',
    boxSizing: 'border-box',
    cursor: 'pointer',
    '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)',
  },
  focused: {
    margin: `0 -${stickness}%`,
    padding: 0,
    opacity: 1,
    zIndex: 10,
    cursor: 'initial',
    transitionDuration: '400ms',
  },
});

export default withStyles(styles)(CarouselSlide);
