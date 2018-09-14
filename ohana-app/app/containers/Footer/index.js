/**
 *
 * Footer
 *
 */

import React from 'react';
import { Container } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Container>
          <nav className="navbar foot-nav">
            <ul className="navbar-nav d-flex justify-content-end">
              <li className="nav-item"> &copy; 2018 Copyright Ohana</li>
            </ul>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
