import React, { Component } from 'react';
import { Input, Menu, Sticky, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import './navbar.css';

class MenuNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="navigation-bar" ref={ this.contextRef }>
        <Sticky context={ this.contextRef }>
          <Menu secondary>
            <Menu.Item
              name='profile'
              active={ activeItem === 'profile' }
              onClick={ this.handleItemClick }
              href='/register'
            />
            <Dropdown item simple text='Open Tickets'>
              <Dropdown.Menu>
                <Dropdown.Item href='/tickets'>My Tickets</Dropdown.Item>
                <Dropdown.Item>All Tickets</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item
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
                onClick={ () => this.logout() }
              />
            </Menu.Menu>
          </Menu>
        </Sticky>
      </div>
    )
  }
}

export default withRouter(MenuNav)