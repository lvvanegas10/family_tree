/**
 *
 * TreePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'containers/Auth';
import styled from 'styled-components';
import { Container, Segment, Header } from 'semantic-ui-react';

import GTreePanel from 'containers/GTreePanel';

/* eslint-disable react/prefer-stateless-function */
const MainContainer = styled(Container)`
  margin-top: 6em;
  margin-bottom: 6em;
`;
class TreePage extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  render() {
    const {
      userData: {
        session: { token },
      },
    } = this.props;
    return (
      <MainContainer>
        <Segment textAlign="center" basic>
          <Header as="h1">My Genealogy Tree</Header>
        </Segment>

        <GTreePanel token={token} />
      </MainContainer>
    );
  }
}

export default Auth(TreePage);
