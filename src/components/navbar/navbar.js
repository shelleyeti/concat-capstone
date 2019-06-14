import React, { Component } from 'react';
import { Input, Menu, Sticky, Dropdown } from 'semantic-ui-react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './navbar.css';

class MenuNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  logout = () => {
    this.props.onLogout();
    this.props.clearActiveUser(null);
    this.props.history.push('/login');
  }

  handleNavView = () => {
    //teacher site
    if (this.props.activeUser !== null && this.props.activeUser.student === false) {
      const { activeItem } = this.state
      return (
        <Menu secondary>
          <Menu.Item>
            <Link to='/dashboard'>Profile</Link>
          </Menu.Item>
          <Dropdown closeOnChange item text='Open Tickets'>
            <Dropdown.Menu>
              <Dropdown.Item >
                <Link to='/tickets/my-tickets'>
                  My Tickets
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/tickets/solved-tickets'>
                  Solved Tickets
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Link to='/teacher/office-hours'>Office Hours</Link>
          </Menu.Item>
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
        </Menu>)
    } else if (this.props.activeUser !== null && this.props.activeUser.student) {
      const { activeItem } = this.state
      return (
        <Menu secondary>
          <Menu.Item>
            <Link to='/dashboard'>Profile</Link>
          </Menu.Item>
          <Dropdown closeOnChange item text='Open Tickets'>
            <Dropdown.Menu>
              <Dropdown.Item >
                <Link to='/tickets/my-tickets'>
                  My Tickets
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to='/tickets/solved-tickets'>
                  Solved Tickets
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Link to='/tickets/new'>New Ticket</Link>
          </Menu.Item>
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
        </Menu>)
    } else {
      return null
    }
  }
  isAuthenticated = () => localStorage.getItem("user") !== null;

  render() {


    return (
      <div className="navigation-bar" ref={ this.contextRef }>
        <Sticky context={ this.contextRef }>
          { this.handleNavView() }
        </Sticky>
      </div >
    )
  }
}

export default withRouter(MenuNav)