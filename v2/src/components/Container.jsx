import React, { Component } from 'react';
import store from '../store';
import Button from './Button.jsx';
import ProfilePicture from './ProfilePicture.jsx';

class Container extends Component {
  constructor() {
    super();

    this.update = this.update.bind(this);
    this.changeBackground = this.changeBackground.bind(this);
    this.state = {
      menuClass: '',
    };
  }

  update() {
    this.setState({
      menuClass: `menu-${store.NAME}`,
    });
  }

  changeBackground() {
    return "red";
  }

  render() {
    return (
      <div className="container">
        <ProfilePicture />

        <ul className={this.state.menuClass}>
          <li>
            <Button
              update={this.update}
              bgColor={this.changeBackground()}
              label="home"
            />
          </li>
          <li>
            <Button
              update={this.update}
              bgColor={this.changeBackground()}
              label="about"
            />
          </li>
         </ul>
      </div>
    );
  }
}

export default Container;
