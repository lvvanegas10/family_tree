/**
 *
 * Auth
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Loader from 'components/Loader';

import injectReducer from 'utils/injectReducer';
import { makeSelectUserData } from './selectors';
import { userDataReducer } from './reducer';

const User = ChildrenView => {
  class UserComponent extends React.PureComponent {
    static propTypes = {
      userData: PropTypes.object.isRequired,
    };

    render() {
      const { userData } = this.props;
      return (
        <ChildrenView
          {...this.props}
          isAuthenticated={userData.status === 'AUTHORIZED'}
        />
      );
    }
  }

  const mapStateToProps = createStructuredSelector({
    userData: makeSelectUserData(),
  });

  const withConnect = connect(mapStateToProps);

  const withReducer = injectReducer({
    key: 'userData',
    reducer: userDataReducer,
  });

  return compose(
    withReducer,
    withConnect,
  )(UserComponent);
};

export default User;
