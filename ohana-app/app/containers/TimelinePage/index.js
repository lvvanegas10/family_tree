/**
 *
 * TimelinePage
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Container, Segment, Header } from 'semantic-ui-react';
import Timeline from './Timeline';

const MainContainer = styled(Container)`
  margin-top: 6em;
  margin-bottom: 6em;
`;

function TimelinePage() {
  return (
    <MainContainer>
      <Segment textAlign="center" basic>
        <Header as="h1">My Timeline</Header>
      </Segment>
      <Segment basic>
        <Timeline />
      </Segment>
    </MainContainer>
  );
}

export default TimelinePage;
