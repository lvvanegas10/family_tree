/**
 *
 * Header
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';

// Semantic
import { Image, Container } from 'semantic-ui-react';

// Images
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
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  componentDidUpdate = prevProps => {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  };

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

export default withRouter(Header);
