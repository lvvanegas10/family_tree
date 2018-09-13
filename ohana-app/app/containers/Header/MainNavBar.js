import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavBar = () => (
  <nav className="navbar main-nav no-margin">
    <ul className="navbar-nav d-flex justify-content-end align-items-stretch">
      <li className="nav-item">
        <NavLink to="/login" activeClassName="active">
          Log In
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/logout" activeClassName="active">
          Sign Up
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default MainNavBar;
