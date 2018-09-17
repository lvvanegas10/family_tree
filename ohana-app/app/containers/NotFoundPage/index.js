/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import { Container, Segment, Header } from 'semantic-ui-react';

const MainContainer = styled(Container)`
  margin-top: 5em;
  margin-bottom: 5em;
`;

export default () => (
  <MainContainer>
    <Segment padded="very">
      <Header as="h1" textAlign="center">
        404 <br /> Not found page.
      </Header>
    </Segment>
  </MainContainer>
);
