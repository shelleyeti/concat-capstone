import React, { Component } from 'react'
import logo from "./concatLogo.svg"

class Logo extends Component {

  render() {
    return (
      <div>
        <img src={ logo } className="logo-header ui medium image" alt="concat logo" />
      </div>
    );
  }
}

export default Logo;