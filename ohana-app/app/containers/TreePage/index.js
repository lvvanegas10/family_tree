/**
 *
 * TreePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'containers/Auth';
import GTreePanel from 'containers/GTreePanel';

/* eslint-disable react/prefer-stateless-function */
class TreePage extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  render() {
    const {
      userData: {
        session: { token },
      },
    } = this.props;
    return <GTreePanel token={token} />;
  }
}

export default Auth(TreePage);
