import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import { Redirect } from 'react-router-dom';

// Redux
import { logout } from './actions';

// Components
import { Auth } from '../Auth';

class Logout extends React.Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
  };

  componentDidMount = () => {
    this.props.logout();
  };

  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return <Loader />;
  }
}

const mapDispatchToProps = {
  logout,
};

export default connect(
  null,
  mapDispatchToProps,
)(Auth(Logout));
