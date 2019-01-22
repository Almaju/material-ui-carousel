import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Swipe from 'react-easy-swipe';
import { withStyles } from '@material-ui/core';
import { size, margin } from './CarouselSlide';
import Dots from './CarouselDots';

class Carousel extends Component {
  state = {
    focused: 0,
    swipe: 0,
  };

  onSwipeMove = (position) => {
    this.setState({
      swipe: position.x,
    });
  }

  onSwipeEnd = () => {
    const { children } = this.props;
    const { focused, swipe } = this.state;
    this.setState({ swipe: 0 });

    if (Math.abs(swipe) > 5) {
      const direction = swipe > 0 ? -1 : 1;
      const max = React.Children.count(children) - 1;
      if ((direction === -1 && focused !== 0) || (direction === 1 && focused !== max)) {
        this.setState({
          focused: focused + direction,
        });
      }
    }
  }

  handleFocus = (index) => {
    this.setState({
      focused: index,
    });
  }

  renderSlide = (slide, i) => {
    const { focused } = this.state;
    return React.cloneElement(slide, {
      focused: i === focused,
      onClick: () => this.handleFocus(i),
    });
  }

  render() {
    const { classes, children } = this.props;
    const { focused } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.carousel}>
          <Swipe
            onSwipeStart={this.onSwipeStart}
            onSwipeMove={this.onSwipeMove}
            onSwipeEnd={this.onSwipeEnd}
          >
            <div
              className={classes.scroller}
              style={{ left: `${(focused - 1) * -(size + (2 * margin))}%` }}
            >
              {React.Children.map(children, this.renderSlide)}
            </div>
          </Swipe>
        </div>
        <div className={classes.dots}>
          <Dots
            index={focused}
            count={React.Children.count(children)}
            onDotClick={this.handleFocus}
          />
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
};

const transition = (duration = 150) => `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

const styles = theme => ({
  root: {
  },
  carousel: {
    padding: '10px 0 30px',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  scroller: {
    position: 'relative',
    transition: transition(),
  },
  dots: {
    marginTop: 8,
    marginBottom: 8,
  },
});

export default withStyles(styles)(Carousel);
