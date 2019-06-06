import React, { Component } from 'react';
import { Grid, Message, Container, Header, Button } from 'semantic-ui-react';

export default class Home extends Component {
  logout = () => {
    this.props.onLogout();
    this.props.history.push('/login');
  }

  render() {
    return (
      <Container className="home--container">
        <Grid>
          <Button
            onClick={() => this.logout()}
            content="Log Out"
            color="purple" />
          <Grid.Row centered>
            <Grid.Column largeScreen={8} computer={10} tablet={12} mobile={16}>
              <Header textAlign="center">Welcome {this.props.user.username}</Header>
              <Message
                icon="lock"
                header="Protected Content"
                content="This component should only be visible if a user is logged in" />
            </Grid.Column>
          </Grid.Row>
        </Grid >
      </Container>
    )
  }
}