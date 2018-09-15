import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import background from 'images/login-background.jpg';

// Antd
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import 'antd/lib/form/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/spin/style/index.less';

// Semantic
import { Header } from 'semantic-ui-react';
import { Auth } from '../Auth';

// Redux
import { loginUser } from '../Auth/actions';

const FormItem = Form.Item;

class LoginPage extends Component {
  static propTypes = {
    form: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
  };

  state = { loading: false };

  handleSubmit = e => {
    e.preventDefault();
    const loading = message.loading('Sign in...', 0);
    this.setState({ loading: true });
    this.props.form.validateFields(async (err, { email, password }) => {
      if (!err) {
        const login = await this.props.loginUser(email, password);
        loading();
        this.setState({ loading: false });
        if (!login) {
          message.error('Incorrect user or password. Please try again.', 3);
        }
      } else {
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { isAuthenticated } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    if (isAuthenticated) {
      return <Redirect to="/" />;
    }
    return (
      <div className="login-page">
        <div
          className="wrap-login"
          style={{ backgroundImage: `url("${background}")` }}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Header as="h1" textAlign="center">
              Enter to your account
            </Header>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Please introduce your e-mail',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="E-mail"
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please introduce your password',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />,
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-form-button"
                block
              >
                Log In
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginUser,
};

export default connect(
  null,
  mapDispatchToProps,
)(Auth(Form.create()(LoginPage)));
