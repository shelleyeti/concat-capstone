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
    this.props.history.push('/login');
  }

  render() {
    const { activeItem } = this.state

    return (
      <div className="navigation-bar" ref={ this.contextRef }>
        <Sticky context={ this.contextRef }>
          <Menu secondary>
            <Menu.Item>
              <Link to='/dashboard/teacher'>Profile</Link>
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
            {/* Closed until all primary isses are addressed */ }
            {/* <Dropdown item simple text='Classes'>
              <Dropdown.Menu>
                <Dropdown.Item >
                  <Link to='/classes/my-classes'>
                    My Classes
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/classes/all-classes'>
                    All Classes
                </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
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
          </Menu>
        </Sticky>
      </div >
    )
  }
}

export default withRouter(MenuNav)