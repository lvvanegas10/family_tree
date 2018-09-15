/**
 *
 * LogInPage
 *
 */

import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import LogInForm from './LogInForm';

/* eslint-disable react/prefer-stateless-function */
export class LogInPage extends React.Component {
  render() {
    return <LogInForm />;
  }
}

export default LogInPage;
