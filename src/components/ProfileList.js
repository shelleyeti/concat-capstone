import React from 'react';
import { getProfiles } from '../APIManager/profiles';
import { Card, Container, Grid, Image } from 'semantic-ui-react';

class ProfileList extends React.Component {

  state = {
    profiles: []
  }

  componentDidMount() {
    getProfiles().then(profiles => {
      this.setState({ profiles: profiles });
    });
  }

  render() {
    return (
      <Container className="profile-list--container">
        <Grid>
          <Grid.Row>
            {
              this.state.profiles.map(profile => {
                return (
                  <Grid.Column key={ profile.id } largeScreen={ 4 } computer={ 4 } tablet={ 8 } mobile={ 16 }>
                    <Card>
                      <Image src={ profile.photoURL } wrapped ui={ false } />
                      <Card.Content>
                        <Card.Header>{ profile.username }</Card.Header>
                        <Card.Description>{ profile.about }</Card.Description>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                )
              })
            }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default ProfileList;