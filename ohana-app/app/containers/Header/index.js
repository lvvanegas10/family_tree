/**
 *
 * Header
 *
 */

import React from 'react';
import styled from 'styled-components';
import { Image, Container, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import mainIcon from 'images/main-icon.png';

// Components
import MainNavBar from './MainNavBar';

const Logo = styled.div`
  position: relative;
  border-radius: 50%;
  width: 10em;
  margin-bottom: -4em;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 1.5em;
`;

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component {
  render() {
    return (
      <header>
        <Container className="header-container d-flex justify-content-between align-items-stretch">
          <Link to="/" className="brand-logo">
            <Logo>
              <Image src={mainIcon} alt="Main Logo" fluid />
            </Logo>
          </Link>
          <MainNavBar />
        </Container>
      </header>
    );
  }
}

export default Header;
