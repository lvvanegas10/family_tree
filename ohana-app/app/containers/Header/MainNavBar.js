import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

// Components
import { Auth } from '../Auth';

const MainNavBar = ({ isAuthenticated }) => (
  <nav className="navbar main-nav no-margin">
    <ul className="navbar-nav d-flex justify-content-end align-items-stretch">
      {!isAuthenticated && (
        <li className="nav-item">
          <NavLink to="/login" activeClassName="active">
            Log In
          </NavLink>
        </li>
      )}
      {!isAuthenticated && (
        <li className="nav-item">
          <NavLink to="/signup" activeClassName="active">
            Sign Up
          </NavLink>
        </li>
      )}
      {isAuthenticated && (
        <li className="nav-item">
          <NavLink to="/my-tree" activeClassName="active">
            My Family Tree
          </NavLink>
        </li>
      )}
      {isAuthenticated && (
        <li className="nav-item">
          <NavLink to="/my-timeline" activeClassName="active">
            My Timeline
          </NavLink>
        </li>
      )}
      {isAuthenticated && (
        <li className="nav-item">
          <NavLink to="/logout" activeClassName="active">
            Logout
          </NavLink>
        </li>
      )}
    </ul>
  </nav>
);

MainNavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withRouter(Auth(MainNavBar));
