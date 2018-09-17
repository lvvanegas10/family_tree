import React from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'containers/Auth';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import moment from 'moment';

// Antd
import Timeline from 'antd/lib/timeline';
import message from 'antd/lib/message';
import 'antd/lib/timeline/style/index.less';

// Semantic
import { Dimmer, Loader, Segment, Header } from 'semantic-ui-react';

/* eslint-disable react/prefer-stateless-function */
class MyTimeline extends React.Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
  };

  state = {
    isLoading: false,
    dataTree: [],
  };

  componentDidMount = () => {
    this.loadTree();
  };

  loadTree = async () => {
    this.setState({ isLoading: true });
    const {
      userData: {
        session: { token },
      },
    } = this.props;
    try {
      const {
        data: { trees },
      } = await axios.get('https://back-p2.herokuapp.com/tree', {
        headers: {
          token,
        },
      });
      if (trees[0].tree.length > 0) {
        this.setState({ dataTree: trees[0].tree });
      } else {
        this.setState({ dataTree: [] });
      }
    } catch (error) {
      console.log(error.response);
      message.error('An error has ocurred. Please, try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  sortDataTree = dataTree => {
    dataTree.sort((a, b) => new Date(a.date) - new Date(b.date));
    return dataTree.filter(node => !isEmpty(node.date));
  };

  renderTimeLine = dataTree =>
    dataTree.map((node, counter) => {
      const date = new Date(node.date);
      console.log(date);
      return (
        <Timeline.Item key={counter}>{`${node.n} - ${moment(node.date).format(
          'DD/MM/YYYY',
        )}`}</Timeline.Item>
      );
    });

  render() {
    const { isLoading, dataTree } = this.state;
    const dataArray = this.sortDataTree([...dataTree]);
    console.log(dataArray);
    return (
      <Dimmer.Dimmable dimmed={isLoading} style={{ minHeight: '300px' }}>
        <Dimmer active={isLoading} inverted>
          <Loader />
        </Dimmer>
        {!isLoading && dataTree.length > 0 ? (
          <Timeline mode="alternate">{this.renderTimeLine(dataArray)}</Timeline>
        ) : (
          []
        )}
        {!isLoading && dataTree.length === 0 ? (
          <Segment basic padded="very" textAlign="center">
            <Header as="h1">Not there is family tree yet</Header>
          </Segment>
        ) : (
          []
        )}
      </Dimmer.Dimmable>
    );
  }
}

export default Auth(MyTimeline);
