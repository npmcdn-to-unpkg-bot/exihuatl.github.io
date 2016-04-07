import React, { Component } from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import store from '../store';

class Button extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    store.NAME = this.props.label;
    this.props.update();
  }

  render() {
    return (
      <RaisedButton
        onClick={this.handleClick}
        label={this.props.label}
        backgroundColor={this.props.bgColor}
        fullWidth
      />
    );
  }
}
Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  update: React.PropTypes.func,
  bgColor: React.PropTypes.string,
};

export default Button;
