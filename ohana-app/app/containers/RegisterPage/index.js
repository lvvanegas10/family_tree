/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// Components
import SignUpForm from './SignUpForm';

/* eslint-disable react/prefer-stateless-function */
const RegisterPage = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return <SignUpForm />;
};

RegisterPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default RegisterPage;
