import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import background from 'images/register-background.jpg';

// Antd
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import notification from 'antd/lib/notification';
import 'antd/lib/form/style/index.less';
import 'antd/lib/input/style/index.less';
import 'antd/lib/button/style/index.less';
import 'antd/lib/spin/style/index.less';
import 'antd/lib/notification/style/index.less';

// Semantic
import { Header } from 'semantic-ui-react';

const FormItem = Form.Item;

const WrapperLogin = styled.div`
  background-image: url(${background});
`;

class SignUpForm extends Component {
  static propTypes = {
    form: PropTypes.object,
    getFieldDecorator: PropTypes.func,
    history: PropTypes.object.isRequired,
  };

  state = { loading: false };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, { name, email, password }) => {
      if (!err) {
        this.signUpUser(name, email, password);
      }
    });
  };

  signUpUser = async (name, email, password) => {
    const loading = message.loading('Processing data...', 0);
    this.setState({ loading: true });
    try {
      await axios.post(
        'https://back-p2.herokuapp.com/users',
        {
          name,
          email,
          password,
          role: 'USER_ROLE',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      this.props.history.push('/login');
      notification.success({
        message: 'Registration complete',
        description: 'You can login now!',
        placement: 'bottomRight',
      });
    } catch (error) {
      this.setState({ loading: false });
    } finally {
      loading();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <div className="login-page">
        <WrapperLogin className="wrap-login">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Header as="h1" textAlign="center">
              Sign Up
            </Header>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please introduce your full name',
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Full name"
                />,
              )}
            </FormItem>
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
                Sign Up
              </Button>
            </FormItem>
          </Form>
        </WrapperLogin>
      </div>
    );
  }
}

export default withRouter(Form.create()(SignUpForm));
