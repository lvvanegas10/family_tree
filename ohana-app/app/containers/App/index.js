/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import LogInPage from 'containers/LogInPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import TreePage from 'containers/TreePage/Loadable';
import TimelinePage from 'containers/TimelinePage/Loadable';
import { Logout } from 'containers/Auth';
import Header from 'containers/Header';
import Footer from 'containers/Footer';
import { checkSession } from '../Auth/actions';

class App extends React.Component {
  static propTypes = {
    checkSession: PropTypes.func.isRequired,
  };

  componentDidMount = () => {
    this.props.checkSession();
  };

  render() {
    return (
      <div>
        <Header />
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} classNames="fade" timeout={300}>
                <Switch location={location}>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/login" component={LogInPage} />
                  <Route exact path="/signup" component={RegisterPage} />
                  <Route exact path="/logout" component={Logout} />
                  <PrivateRoute exact path="/my-tree" component={TreePage} />
                  <PrivateRoute
                    exact
                    path="/my-timeline"
                    component={TimelinePage}
                  />
                  <Route component={NotFoundPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
        <Footer />
      </div>
    );
  }
}

const mapDispatchToProps = {
  checkSession,
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(App),
);
