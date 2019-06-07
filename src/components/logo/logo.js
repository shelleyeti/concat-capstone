import React, { Component } from 'react'
import logo from "./concatSmall.png"

class Logo extends Component {

  render() {
    return (
      <div>
        <img src={ logo } className="logo-header" alt="concat logo" />
      </div>
    );
  }
}

export default Logo;