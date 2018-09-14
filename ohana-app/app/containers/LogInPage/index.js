/**
 *
 * LogInPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Divider } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
export class LogInPage extends React.Component {
  render() {
    return (
      <Container>
        <Container className="d-flex justify-content-center align-items-stretch">
          <h1>Log In</h1>
        </Container>
        <Divider />
      </Container>
    );
  }
}

LogInPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(LogInPage);
