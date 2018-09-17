import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

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
import { authSuccess } from '../Auth/actions';

const FormItem = Form.Item;

const WrapperLogin = styled.div`
  background-image: url(${background});
`;

class LoginPage extends Component {
  static propTypes = {
    form: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    isAuthenticated: PropTypes.bool.isRequired,
    authSuccess: PropTypes.func.isRequired,
  };

  state = { loading: false };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { email, password }) => {
      if (!err) {
        this.loginUser(email, password);
      }
    });
  };

  loginUser = async (email, password) => {
    const loading = message.loading('Sign in...', 0);
    this.setState({ loading: true });
    try {
      const {
        data: { token, user },
      } = await axios.post(
        'https://back-p2.herokuapp.com/login',
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const expirationTime = new Date(Date.now());
      expirationTime.setDate(expirationTime.getDate() + 1);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationTime', expirationTime);
      this.props.authSuccess(token, user);
    } catch (error) {
      message.error('Incorrect user or password. Please try again.', 4);
      this.setState({ loading: false });
    } finally {
      loading();
    }
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
        <WrapperLogin className="wrap-login">
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
        </WrapperLogin>
      </div>
    );
  }
}

const mapDispatchToProps = {
  authSuccess,
};

export default connect(
  null,
  mapDispatchToProps,
)(Auth(Form.create()(LoginPage)));
