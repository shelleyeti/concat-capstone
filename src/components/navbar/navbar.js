import React, { Component } from 'react'
import { Input, Menu, Sticky } from 'semantic-ui-react'
import './navbar.css';

export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="navigation-bar" ref={ this.contextRef }>
        <Sticky context={ this.contextRef }>
          <Menu secondary>
            <Menu.Item
              href='/profile/'
              name='profile'
              active={ activeItem === 'profile' }
              onClick={ this.handleItemClick }
            />
            <Menu.Item
              href='/tickets/'
              name='open-tickets'
              active={ activeItem === 'open-tickets' }
              onClick={ this.handleItemClick }
            />
            <Menu.Item
              href='/office-hours/'
              name='office-hours'
              active={ activeItem === 'office-hours' }
              onClick={ this.handleItemClick }
            />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input
                  icon='search'
                  placeholder='Search...' />
              </Menu.Item>
              <Menu.Item
                name='logout'
                active={ activeItem === 'logout' }
                onClick={ this.handleItemClick }
              />
            </Menu.Menu>
          </Menu>
        </Sticky>
      </div>
    )
  }
}